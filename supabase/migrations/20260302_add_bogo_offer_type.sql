-- ============================================================
-- KL-59 Men's Fashion — Migration: Add BOGO offer type
-- Version: 1.1.0  |  Date: 2026-03-02
-- ============================================================
-- Context:
--   The original offers table only allowed offer_type values of
--   'campaign', 'product_offer', and 'combo'.
--   This migration adds 'bogo' (Buy One Get One Free) as a valid type.
--
-- How BOGO works (no new columns needed):
--   • combo_items  → two rows: index 0 = buy product, index 1 = free product (qty 1 each)
--   • discount_value → the ₹ savings amount shown on the offer card
--   • combo_price  → not used for BOGO (leave null)
-- ============================================================

-- Drop the old constraint and replace with one that includes 'bogo'
ALTER TABLE public.offers DROP CONSTRAINT IF EXISTS offers_offer_type_check;

ALTER TABLE public.offers
  ADD CONSTRAINT offers_offer_type_check
  CHECK (offer_type IN ('campaign', 'product_offer', 'combo', 'bogo'));

-- ============================================================
-- END OF MIGRATION
-- ============================================================
