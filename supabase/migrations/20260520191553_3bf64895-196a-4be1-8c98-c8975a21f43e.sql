
CREATE TABLE public.financial_expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_date date NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  amount numeric(12,2) NOT NULL,
  currency text NOT NULL DEFAULT 'EUR',
  notes text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.financial_income (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entry_date date NOT NULL,
  source text NOT NULL,
  gross numeric(12,2) NOT NULL,
  net numeric(12,2) NOT NULL,
  currency text NOT NULL DEFAULT 'EUR',
  notes text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.financial_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_income ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Public can view financial_expenses"
  ON public.financial_expenses FOR SELECT
  USING (true);

CREATE POLICY "Public can view financial_income"
  ON public.financial_income FOR SELECT
  USING (true);

-- Admin write
CREATE POLICY "Admins can insert financial_expenses"
  ON public.financial_expenses FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update financial_expenses"
  ON public.financial_expenses FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete financial_expenses"
  ON public.financial_expenses FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert financial_income"
  ON public.financial_income FOR INSERT TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update financial_income"
  ON public.financial_income FOR UPDATE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete financial_income"
  ON public.financial_income FOR DELETE TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

-- updated_at triggers (reuse existing function)
CREATE TRIGGER trg_financial_expenses_updated_at
  BEFORE UPDATE ON public.financial_expenses
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER trg_financial_income_updated_at
  BEFORE UPDATE ON public.financial_income
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_financial_expenses_date ON public.financial_expenses(entry_date);
CREATE INDEX idx_financial_income_date ON public.financial_income(entry_date);
