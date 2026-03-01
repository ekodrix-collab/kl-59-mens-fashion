-- ============================================================
-- KL-59 Men's Fashion — Initial Database Migration
-- Version: 1.0.0  |  Date: 2026-02-28
-- Run in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

create extension if not exists "pgcrypto";

-- ============================================================
-- 1. CATEGORIES
--    Collections like Denim, Shirts, Formals, Casuals etc.
-- ============================================================
create table if not exists public.categories (
  id            uuid        primary key default gen_random_uuid(),
  name          text        not null,
  slug          text        not null unique,
  image         text,                        -- Cloudinary URL
  display_order integer     not null default 0,
  created_at    timestamptz not null default now()
);

alter table public.categories enable row level security;

create policy "Public read categories"
  on public.categories for select using (true);

create policy "Admin manage categories"
  on public.categories for all using (auth.role() = 'authenticated');

-- ============================================================
-- 2. PRODUCTS
--    Core inventory. Category links handled via junction table.
-- ============================================================
create table if not exists public.products (
  id               uuid        primary key default gen_random_uuid(),
  name             text        not null,
  slug             text        not null unique,
  description      text,
  mrp              numeric(10,2) not null default 0,
  selling_price    numeric(10,2) not null default 0,
  discount_percent integer     not null default 0,
  sizes            text[]      not null default '{}',   -- e.g. ['S','M','L','XL']
  colors           text[]      not null default '{}',   -- e.g. ['Indigo','Charcoal']
  color_images     jsonb       not null default '{}',   -- {"Indigo":"cloudinary-url"}
  images           text[]      not null default '{}',   -- Cloudinary URLs
  is_featured      boolean     not null default false,
  is_new_arrival   boolean     not null default false,
  is_on_offer      boolean     not null default false,  -- true if any active offer exists
  is_published     boolean     not null default false,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- Auto-update updated_at on every row change
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger products_updated_at
  before update on public.products
  for each row execute procedure public.handle_updated_at();

alter table public.products enable row level security;

create policy "Public read published products"
  on public.products for select using (is_published = true);

create policy "Admin manage products"
  on public.products for all using (auth.role() = 'authenticated');

-- ============================================================
-- 3. PRODUCT_CATEGORIES (many-to-many junction)
--    One product can belong to multiple categories.
--    is_primary = the label shown on product cards in the UI.
-- ============================================================
create table if not exists public.product_categories (
  product_id  uuid    not null references public.products(id)   on delete cascade,
  category_id uuid    not null references public.categories(id) on delete cascade,
  is_primary  boolean not null default false,
  primary key (product_id, category_id)
);

alter table public.product_categories enable row level security;

create policy "Public read product_categories"
  on public.product_categories for select using (true);

create policy "Admin manage product_categories"
  on public.product_categories for all using (auth.role() = 'authenticated');

-- ============================================================
-- 4. OFFERS
--    Three types controlled by offer_type:
--    • campaign     → editorial banner, sitewide or category deal
--    • product_offer → discount on one specific product
--    • combo        → bundle of 2+ products at one price
-- ============================================================
create table if not exists public.offers (
  id             uuid          primary key default gen_random_uuid(),
  offer_type     text          not null default 'campaign'
                                 check (offer_type in ('campaign', 'product_offer', 'combo')),
  title          text          not null,
  description    text,
  banner_image   text,                          -- Cloudinary URL (campaign & combo)

  -- For campaign and product_offer: percentage or flat discount
  discount_type  text          not null default 'percentage'
                                 check (discount_type in ('percentage', 'flat')),
  discount_value numeric(10,2),                 -- e.g. 50 (%) or 500 (₹)

  -- combo only: the all-in bundle price shown to customer
  combo_price    numeric(10,2),

  -- product_offer only: the single targeted product
  product_id     uuid          references public.products(id) on delete cascade,

  start_date     date,
  end_date       date,
  is_active      boolean       not null default true,
  created_at     timestamptz   not null default now(),

  -- Integrity constraints
  constraint product_offer_needs_product_id
    check (offer_type != 'product_offer' or product_id is not null),

  constraint combo_needs_combo_price
    check (offer_type != 'combo' or combo_price is not null)
);

alter table public.offers enable row level security;

create policy "Public read active offers"
  on public.offers for select using (is_active = true);

create policy "Admin manage offers"
  on public.offers for all using (auth.role() = 'authenticated');

-- ============================================================
-- 5. COMBO_ITEMS (junction — combo offers only)
--    Lists every product inside a combo bundle + how many.
--    Example: Shirt x2 + Pant x1 = 2 rows for one combo offer.
-- ============================================================
create table if not exists public.combo_items (
  id            uuid    primary key default gen_random_uuid(),
  offer_id      uuid    not null references public.offers(id)   on delete cascade,
  product_id    uuid    not null references public.products(id) on delete cascade,
  quantity      integer not null default 1 check (quantity >= 1),
  display_order integer not null default 0
);

alter table public.combo_items enable row level security;

create policy "Public read combo_items"
  on public.combo_items for select using (true);

create policy "Admin manage combo_items"
  on public.combo_items for all using (auth.role() = 'authenticated');

-- ============================================================
-- 6. OFFER_PRODUCTS (junction — campaign offers only)
--    Links a campaign to specific targeted products.
--    If no rows for a campaign → it is sitewide / editorial only.
-- ============================================================
create table if not exists public.offer_products (
  offer_id   uuid not null references public.offers(id)   on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  primary key (offer_id, product_id)
);

alter table public.offer_products enable row level security;

create policy "Public read offer_products"
  on public.offer_products for select using (true);

create policy "Admin manage offer_products"
  on public.offer_products for all using (auth.role() = 'authenticated');

-- ============================================================
-- 7. STORE_INFO (singleton — always exactly 1 row)
--    All content for the Admin → Settings page.
-- ============================================================
create table if not exists public.store_info (
  id                uuid        primary key default gen_random_uuid(),
  store_name        text        not null default 'KL-59',
  tagline           text        not null default 'Men''s Fashion',
  hero_tagline      text        not null default 'Redefine Your Style',
  hero_subtitle     text        not null default '',
  about_text        text,
  about_quote       text        not null default '',
  address           text,
  phone             text,
  whatsapp          text,                        -- digits only e.g. 919895884796
  email             text,
  working_hours     text,
  instagram         text,
  google_maps_url   text,
  google_maps_embed text,                        -- full <iframe> embed code
  logo              text,                        -- Cloudinary URL
  hero_image        text,                        -- Cloudinary URL
  hero_video        text,                        -- Cloudinary URL (MP4/WEBM)
  stats_customers   text        not null default '5000+',
  stats_brands      text        not null default '50+',
  stats_rating      text        not null default '4.9'
);

alter table public.store_info enable row level security;

create policy "Public read store info"
  on public.store_info for select using (true);

create policy "Admin manage store info"
  on public.store_info for all using (auth.role() = 'authenticated');

-- Seed the one and only row
insert into public.store_info (
  store_name, tagline, hero_tagline, hero_subtitle,
  about_text, about_quote,
  address, phone, whatsapp, working_hours,
  stats_customers, stats_brands, stats_rating
) values (
  'KL-59',
  'Men''s Fashion',
  'Redefine Your Style',
  'Premium men''s fashion that makes a statement.',
  'KL-59 is a premium men''s fashion boutique based in Kerala.',
  'Style is a way to say who you are without having to speak.',
  'NH, Taliparamba, Kannur, Kerala - 670141',
  '+91 9895884796',
  '919895884796',
  '10:00 AM - 9:00 PM',
  '5000+',
  '50+',
  '4.9'
);

-- ============================================================
-- 8. OUTFIT_LOOKS
--    Lookbook / editorial items for the Story page.
-- ============================================================
create table if not exists public.outfit_looks (
  id            uuid        primary key default gen_random_uuid(),
  title         text        not null,
  description   text,
  product_id    uuid        references public.products(id) on delete set null,
  model_image   text        not null,  -- Cloudinary URL, full-body model shot
  thumbnail     text        not null,  -- Cloudinary URL, square card thumbnail
  display_order integer     not null default 0,
  is_active     boolean     not null default true,
  created_at    timestamptz not null default now()
);

alter table public.outfit_looks enable row level security;

create policy "Public read active looks"
  on public.outfit_looks for select using (is_active = true);

create policy "Admin manage outfit looks"
  on public.outfit_looks for all using (auth.role() = 'authenticated');

-- ============================================================
-- 9. INDEXES (optimise common query patterns)
-- ============================================================
create index if not exists idx_products_is_published    on public.products(is_published);
create index if not exists idx_products_is_featured     on public.products(is_featured);
create index if not exists idx_products_is_new_arrival  on public.products(is_new_arrival);
create index if not exists idx_products_is_on_offer     on public.products(is_on_offer);

create index if not exists idx_product_cats_product     on public.product_categories(product_id);
create index if not exists idx_product_cats_category    on public.product_categories(category_id);

create index if not exists idx_offers_is_active         on public.offers(is_active);
create index if not exists idx_offers_offer_type        on public.offers(offer_type);
create index if not exists idx_offers_product_id        on public.offers(product_id);

create index if not exists idx_combo_items_offer        on public.combo_items(offer_id);
create index if not exists idx_combo_items_product      on public.combo_items(product_id);

create index if not exists idx_offer_products_offer     on public.offer_products(offer_id);
create index if not exists idx_offer_products_product   on public.offer_products(product_id);

create index if not exists idx_categories_slug          on public.categories(slug);
create index if not exists idx_outfit_looks_is_active   on public.outfit_looks(is_active);

-- ============================================================
-- END OF MIGRATION
-- ============================================================
<<<<<<< HEAD


-- Allow all operations for testing. (You can restrict these to authenticated users later)

-- Categories
DROP POLICY IF EXISTS "Enable all for anyone" ON categories;
CREATE POLICY "Enable all for anyone" ON categories FOR ALL USING (true) WITH CHECK (true);

-- Products
DROP POLICY IF EXISTS "Enable all for anyone" ON products;
CREATE POLICY "Enable all for anyone" ON products FOR ALL USING (true) WITH CHECK (true);

-- Product Categories
DROP POLICY IF EXISTS "Enable all for anyone" ON product_categories;
CREATE POLICY "Enable all for anyone" ON product_categories FOR ALL USING (true) WITH CHECK (true);

-- Offers
DROP POLICY IF EXISTS "Enable all for anyone" ON offers;
CREATE POLICY "Enable all for anyone" ON offers FOR ALL USING (true) WITH CHECK (true);

-- Store Info
DROP POLICY IF EXISTS "Enable all for anyone" ON store_info;
CREATE POLICY "Enable all for anyone" ON store_info FOR ALL USING (true) WITH CHECK (true);

=======
>>>>>>> dev
