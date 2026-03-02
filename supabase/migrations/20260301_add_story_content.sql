-- Add dynamic content fields to store_info
ALTER TABLE public.store_info 
ADD COLUMN IF NOT EXISTS story_hero_title text DEFAULT 'The Heritage',
ADD COLUMN IF NOT EXISTS story_hero_subtitle text DEFAULT 'ESTABLISHED IN EXCELLENCE',
ADD COLUMN IF NOT EXISTS story_main_title text DEFAULT 'Style that speaks before you do.',
ADD COLUMN IF NOT EXISTS story_main_subtitle text DEFAULT 'THE CRAFT',
ADD COLUMN IF NOT EXISTS story_main_content text DEFAULT 'KL-59 was established with a singular vision: to define the modern masculine silhouette through uncompromising craftsmanship and timeless design. We believe that true luxury lies in the details—the precision of a stitch, the hand-feel of pima cotton, and the character of raw denim.',
ADD COLUMN IF NOT EXISTS story_hero_image text DEFAULT 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1920&q=80',
ADD COLUMN IF NOT EXISTS story_main_image text DEFAULT 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80',
ADD COLUMN IF NOT EXISTS philosophy_json jsonb DEFAULT '[
  {"title": "Artisanal Quality", "desc": "Every piece is a testament to the artisans who dedicate years to perfecting their craft, from loom to final press."},
  {"title": "Modern Silhouette", "desc": "We reinterpret classic masculine forms for the contemporary era, balancing architectural structure with ease."},
  {"title": "Global Collective", "desc": "Inspired by the textures of travel and the rhythm of the city, KL-59 is a brand for the global citizen."}
]';
