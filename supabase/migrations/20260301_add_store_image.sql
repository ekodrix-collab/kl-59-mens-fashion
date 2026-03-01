-- Migration: Add store_image column to store_info
-- Date: 2026-03-01

ALTER TABLE public.store_info 
ADD COLUMN IF NOT EXISTS store_image text;

-- Update the existing row with a placeholder if needed, 
-- or leave as null for the admin to upload.
COMMENT ON COLUMN public.store_info.store_image IS 'Cloudinary URL for the boutique interior/storefront image.';
