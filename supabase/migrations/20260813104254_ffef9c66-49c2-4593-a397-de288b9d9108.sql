
-- 1. Fix round stats function (previously referenced non-existent columns)
CREATE OR REPLACE FUNCTION public.update_review_round_stats()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_round_id UUID;
  v_total INTEGER;
  v_completed INTEGER;
  v_in_progress INTEGER;
  v_pending INTEGER;
BEGIN
  IF TG_OP = 'DELETE' THEN
    v_round_id := OLD.review_round_id;
  ELSE
    v_round_id := NEW.review_round_id;
  END IF;

  IF v_round_id IS NULL THEN
    RETURN NULL;
  END IF;

  SELECT
    COUNT(*),
    COUNT(*) FILTER (WHERE status = 'completed'),
    COUNT(*) FILTER (WHERE status = 'in_progress'),
    COUNT(*) FILTER (WHERE status = 'pending')
  INTO v_total, v_completed, v_in_progress, v_pending
  FROM public.product_reviews
  WHERE review_round_id = v_round_id;

  UPDATE public.review_rounds
  SET total_products = v_total,
      total_assignments = v_total,
      updated_at = NOW()
  WHERE id = v_round_id;

  INSERT INTO public.review_round_stats (round_id, total_assignments, completed_count, in_progress_count, pending_count, updated_at)
  VALUES (v_round_id, v_total, v_completed, v_in_progress, v_pending, NOW())
  ON CONFLICT (round_id) DO UPDATE
    SET total_assignments = EXCLUDED.total_assignments,
        completed_count = EXCLUDED.completed_count,
        in_progress_count = EXCLUDED.in_progress_count,
        pending_count = EXCLUDED.pending_count,
        updated_at = NOW();

  RETURN NULL;
END;
$$;

-- ensure one stats row per round so ON CONFLICT works
DELETE FROM public.review_round_stats a
USING public.review_round_stats b
WHERE a.round_id = b.round_id AND a.ctid > b.ctid;

CREATE UNIQUE INDEX IF NOT EXISTS review_round_stats_round_id_key
  ON public.review_round_stats(round_id);

DROP TRIGGER IF EXISTS trg_review_round_stats ON public.product_reviews;
CREATE TRIGGER trg_review_round_stats
AFTER INSERT OR UPDATE OF status, review_round_id OR DELETE ON public.product_reviews
FOR EACH ROW EXECUTE FUNCTION public.update_review_round_stats();

-- 2. Maintain completed_at automatically
CREATE OR REPLACE FUNCTION public.set_review_completed_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'completed' AND NEW.completed_at IS NULL THEN
    NEW.completed_at := COALESCE(NEW.last_activity_at, NOW());
  ELSIF NEW.status IS DISTINCT FROM 'completed' AND OLD.status = 'completed' THEN
    NEW.completed_at := NULL;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_set_review_completed_at ON public.product_reviews;
CREATE TRIGGER trg_set_review_completed_at
BEFORE INSERT OR UPDATE OF status ON public.product_reviews
FOR EACH ROW EXECUTE FUNCTION public.set_review_completed_at();

-- 3. Daily expiry of stale company invitations
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pg_cron') THEN
    PERFORM cron.unschedule('expire-old-invitations-daily')
    WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'expire-old-invitations-daily');

    PERFORM cron.schedule(
      'expire-old-invitations-daily',
      '15 3 * * *',
      $cron$SELECT public.expire_old_invitations();$cron$
    );
  END IF;
END;
$$;
