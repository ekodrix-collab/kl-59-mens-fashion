-- Add hero_video_library to store_info table
ALTER TABLE public.store_info ADD COLUMN IF NOT EXISTS hero_video_library text[] NOT NULL DEFAULT '{}';
