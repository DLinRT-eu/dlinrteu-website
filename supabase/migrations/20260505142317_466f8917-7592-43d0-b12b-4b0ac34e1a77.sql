INSERT INTO public.product_reviews (product_id, review_round_id, assigned_to, status, priority, deadline)
VALUES
  ('medcom-prosoma-dart', 'f4a91470-2564-4d03-8874-5be5b63e1740', '71a2b231-8a64-4ed3-8c2e-a5d8cb83457b', 'pending', 'medium', '2026-06-10'),
  ('quanta-qoca-image-smart-rt', 'f4a91470-2564-4d03-8874-5be5b63e1740', '75c66452-8979-4dd9-8f62-fda18b4e0c8c', 'pending', 'medium', '2026-06-10');

UPDATE public.review_rounds
SET total_assignments = (SELECT COUNT(*) FROM public.product_reviews WHERE review_round_id = 'f4a91470-2564-4d03-8874-5be5b63e1740'),
    total_products = (SELECT COUNT(DISTINCT product_id) FROM public.product_reviews WHERE review_round_id = 'f4a91470-2564-4d03-8874-5be5b63e1740'),
    updated_at = now()
WHERE id = 'f4a91470-2564-4d03-8874-5be5b63e1740';