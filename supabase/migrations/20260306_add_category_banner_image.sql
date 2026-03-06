-- ============================================================
-- Add banner_image column to categories table
-- Date: 2026-03-06
-- Run in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

alter table public.categories
  add column if not exists banner_image text;

comment on column public.categories.banner_image
  is 'Cloudinary URL — used as the full-width hero banner on the /collections/[slug] page';
