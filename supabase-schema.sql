-- ══════════════════════════════════════════════════════════════════════
--  HELLAS HERITAGE v2.0 — Expanded Supabase Schema
--  Τρέξε στο: Supabase → SQL Editor → New query
--  Νέοι πίνακες: authors, sources, bibliography, media_assets,
--                translations, profiles, favorites, subscriptions
-- ══════════════════════════════════════════════════════════════════════

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ══════════════════════════════════════════════════════════════════════
--  CORE TABLES
-- ══════════════════════════════════════════════════════════════════════

-- Authors / Curators
CREATE TABLE IF NOT EXISTS authors (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  name_en     TEXT,
  title       TEXT,                     -- π.χ. "Δρ. Λαογραφίας"
  institution TEXT,                     -- π.χ. "Πανεπιστήμιο Αθηνών"
  bio         TEXT,
  avatar_url  TEXT,
  email       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Regions
CREATE TABLE IF NOT EXISTS regions (
  id              SERIAL PRIMARY KEY,
  name            TEXT NOT NULL,
  name_en         TEXT,
  type            TEXT CHECK (type IN ('ηπειρος','νησι','νομος','πολη')),
  slug            TEXT UNIQUE NOT NULL,
  description     TEXT,
  description_en  TEXT,
  image           TEXT,
  lat             NUMERIC(9,6),
  lng             NUMERIC(9,6),
  costumes_count  INTEGER DEFAULT 0,
  customs_count   INTEGER DEFAULT 0,
  featured        BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Costumes (φορεσιές)
CREATE TABLE IF NOT EXISTS costumes (
  id              SERIAL PRIMARY KEY,
  name            TEXT NOT NULL,
  name_en         TEXT,
  slug            TEXT UNIQUE NOT NULL,
  region_id       INTEGER REFERENCES regions(id),
  author_id       INTEGER REFERENCES authors(id),
  gender          TEXT CHECK (gender IN ('ΑΝΔΡΙΚΗ','ΓΥΝΑΙΚΕΙΑ','ΠΑΙΔΙΚΗ','ΜΙΚΤΗ')),
  period          TEXT,                  -- π.χ. "18ος–19ος αιώνας"
  occasion        TEXT,
  materials       TEXT[] DEFAULT '{}',
  colors          TEXT[] DEFAULT '{}',
  description     TEXT,
  description_en  TEXT,
  symbolism       TEXT,
  symbolism_en    TEXT,
  curator_note    TEXT,                  -- ✨ Νέο: σχόλιο curator
  reliability     SMALLINT DEFAULT 3 CHECK (reliability BETWEEN 1 AND 5), -- ✨ ✦ rating
  image           TEXT,
  model_glb_url   TEXT,                  -- ✨ URL σε GLB αρχείο για 3D viewer
  is_premium      BOOLEAN DEFAULT FALSE,
  featured        BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Customs (έθιμα)
CREATE TABLE IF NOT EXISTS customs (
  id              SERIAL PRIMARY KEY,
  name            TEXT NOT NULL,
  name_en         TEXT,
  slug            TEXT UNIQUE NOT NULL,
  region_id       INTEGER REFERENCES regions(id),
  author_id       INTEGER REFERENCES authors(id),
  category        TEXT CHECK (category IN ('ΓΑΜΗΛΙΟ','ΘΡΗΣΚΕΥΤΙΚΟ','ΑΓΡΟΤΙΚΟ','ΕΠΟΧΙΑΚΟ','ΚΟΙΝΩΝΙΚΟ','ΕΠΕΤΕΙΑΚΟ')),
  period_of_year  TEXT,
  description     TEXT,
  description_en  TEXT,
  curator_note    TEXT,
  reliability     SMALLINT DEFAULT 3 CHECK (reliability BETWEEN 1 AND 5),
  image           TEXT,
  is_premium      BOOLEAN DEFAULT FALSE,
  featured        BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Events (εκδηλώσεις)
CREATE TABLE IF NOT EXISTS events (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  name_en     TEXT,
  slug        TEXT UNIQUE,
  type        TEXT,
  date        TEXT,
  location    TEXT,
  lat         NUMERIC(9,6),
  lng         NUMERIC(9,6),
  description TEXT,
  image       TEXT,
  website     TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════════════════════════════════════
--  NEW: CONTENT CREDIBILITY TABLES
-- ══════════════════════════════════════════════════════════════════════

-- Bibliography / Sources
CREATE TABLE IF NOT EXISTS bibliography (
  id            SERIAL PRIMARY KEY,
  costume_id    INTEGER REFERENCES costumes(id) ON DELETE CASCADE,
  custom_id     INTEGER REFERENCES customs(id)  ON DELETE CASCADE,
  author_names  TEXT NOT NULL,            -- π.χ. "Πολίτης Ν., 1931"
  title         TEXT NOT NULL,
  publisher     TEXT,
  year          SMALLINT,
  url           TEXT,
  doi           TEXT,
  source_type   TEXT CHECK (source_type IN ('βιβλίο','άρθρο','αρχείο','μουσείο','προφορική_μαρτυρία','διαδίκτυο')),
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Media Assets (φωτογραφικά credits)
CREATE TABLE IF NOT EXISTS media_assets (
  id            SERIAL PRIMARY KEY,
  costume_id    INTEGER REFERENCES costumes(id) ON DELETE CASCADE,
  custom_id     INTEGER REFERENCES customs(id)  ON DELETE CASCADE,
  region_id     INTEGER REFERENCES regions(id)  ON DELETE CASCADE,
  url           TEXT NOT NULL,
  thumbnail_url TEXT,
  alt_el        TEXT,
  alt_en        TEXT,
  photographer  TEXT,                     -- όνομα φωτογράφου
  source        TEXT,                     -- π.χ. "Μουσείο Μπενάκη"
  license       TEXT DEFAULT 'CC BY-NC 4.0',
  year          SMALLINT,
  is_primary    BOOLEAN DEFAULT FALSE,
  sort_order    INTEGER DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Translations (bilingual content — EL + EN)
CREATE TABLE IF NOT EXISTS translations (
  id          SERIAL PRIMARY KEY,
  table_name  TEXT NOT NULL,             -- π.χ. 'costumes'
  record_id   INTEGER NOT NULL,
  locale      TEXT NOT NULL DEFAULT 'en',
  field       TEXT NOT NULL,             -- π.χ. 'description'
  value       TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(table_name, record_id, locale, field)
);

-- ══════════════════════════════════════════════════════════════════════
--  NEW: USER / SUBSCRIPTION TABLES
-- ══════════════════════════════════════════════════════════════════════

-- User profiles (linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name    TEXT,
  avatar_url      TEXT,
  role            TEXT DEFAULT 'free' CHECK (role IN ('free','premium','educator','admin')),
  institution     TEXT,                  -- για teacher accounts
  subscription_id TEXT,                  -- Stripe subscription ID
  subscription_ends_at TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions log
CREATE TABLE IF NOT EXISTS subscriptions (
  id              SERIAL PRIMARY KEY,
  user_id         UUID REFERENCES profiles(id),
  plan            TEXT CHECK (plan IN ('free','klironomos','educator')),
  status          TEXT CHECK (status IN ('active','cancelled','expired','trialing')),
  stripe_id       TEXT,
  started_at      TIMESTAMPTZ DEFAULT NOW(),
  ends_at         TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Favorites
CREATE TABLE IF NOT EXISTS favorites (
  id          SERIAL PRIMARY KEY,
  user_id     UUID REFERENCES profiles(id) ON DELETE CASCADE,
  costume_id  INTEGER REFERENCES costumes(id) ON DELETE CASCADE,
  custom_id   INTEGER REFERENCES customs(id)  ON DELETE CASCADE,
  region_id   INTEGER REFERENCES regions(id)  ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  CHECK (
    (costume_id IS NOT NULL)::INT +
    (custom_id  IS NOT NULL)::INT +
    (region_id  IS NOT NULL)::INT = 1
  )
);

-- Download history (PDFs, GLB files)
CREATE TABLE IF NOT EXISTS downloads (
  id          SERIAL PRIMARY KEY,
  user_id     UUID REFERENCES profiles(id),
  asset_type  TEXT CHECK (asset_type IN ('pdf','glb','image')),
  asset_id    INTEGER,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ══════════════════════════════════════════════════════════════════════
--  VIEWS
-- ══════════════════════════════════════════════════════════════════════

-- Costumes with region name & author
CREATE OR REPLACE VIEW costumes_full AS
SELECT
  c.*,
  r.name        AS region_name,
  r.name_en     AS region_name_en,
  r.slug        AS region_slug,
  a.name        AS author_name,
  a.title       AS author_title,
  a.institution AS author_institution
FROM costumes c
LEFT JOIN regions r ON r.id = c.region_id
LEFT JOIN authors a ON a.id = c.author_id;

-- Customs with region name & author
CREATE OR REPLACE VIEW customs_full AS
SELECT
  cu.*,
  r.name    AS region_name,
  r.slug    AS region_slug,
  a.name    AS author_name
FROM customs cu
LEFT JOIN regions r ON r.id = cu.region_id
LEFT JOIN authors a ON a.id = cu.author_id;

-- ══════════════════════════════════════════════════════════════════════
--  ROW LEVEL SECURITY
-- ══════════════════════════════════════════════════════════════════════

ALTER TABLE profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites     ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads     ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only read/update their own
CREATE POLICY "Users see own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Favorites: users manage their own
CREATE POLICY "Users see own favorites"
  ON favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert favorites"
  ON favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete favorites"
  ON favorites FOR DELETE USING (auth.uid() = user_id);

-- Public read on content tables
CREATE POLICY "Public read regions"   ON regions    FOR SELECT USING (true);
CREATE POLICY "Public read costumes"  ON costumes   FOR SELECT USING (true);
CREATE POLICY "Public read customs"   ON customs    FOR SELECT USING (true);
CREATE POLICY "Public read events"    ON events     FOR SELECT USING (true);
CREATE POLICY "Public read authors"   ON authors    FOR SELECT USING (true);
CREATE POLICY "Public read biblio"    ON bibliography FOR SELECT USING (true);
CREATE POLICY "Public read media"     ON media_assets FOR SELECT USING (true);

ALTER TABLE regions     ENABLE ROW LEVEL SECURITY;
ALTER TABLE costumes    ENABLE ROW LEVEL SECURITY;
ALTER TABLE customs     ENABLE ROW LEVEL SECURITY;
ALTER TABLE events      ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors     ENABLE ROW LEVEL SECURITY;
ALTER TABLE bibliography ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

-- ══════════════════════════════════════════════════════════════════════
--  INDEXES
-- ══════════════════════════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS idx_costumes_region  ON costumes(region_id);
CREATE INDEX IF NOT EXISTS idx_costumes_gender  ON costumes(gender);
CREATE INDEX IF NOT EXISTS idx_costumes_premium ON costumes(is_premium);
CREATE INDEX IF NOT EXISTS idx_costumes_featured ON costumes(featured);
CREATE INDEX IF NOT EXISTS idx_customs_region   ON customs(region_id);
CREATE INDEX IF NOT EXISTS idx_customs_category ON customs(category);
CREATE INDEX IF NOT EXISTS idx_favorites_user   ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_bibliography_costume ON bibliography(costume_id);
CREATE INDEX IF NOT EXISTS idx_bibliography_custom  ON bibliography(custom_id);
CREATE INDEX IF NOT EXISTS idx_media_costume    ON media_assets(costume_id);
CREATE INDEX IF NOT EXISTS idx_media_custom     ON media_assets(custom_id);
CREATE INDEX IF NOT EXISTS idx_translations_ref ON translations(table_name, record_id, locale);

-- Full-text search (Greek + English)
CREATE INDEX IF NOT EXISTS idx_costumes_fts ON costumes
  USING gin(to_tsvector('simple', coalesce(name,'') || ' ' || coalesce(description,'')));
CREATE INDEX IF NOT EXISTS idx_customs_fts ON customs
  USING gin(to_tsvector('simple', coalesce(name,'') || ' ' || coalesce(description,'')));

-- ══════════════════════════════════════════════════════════════════════
--  SAMPLE DATA — Authors
-- ══════════════════════════════════════════════════════════════════════

INSERT INTO authors (name, name_en, title, institution) VALUES
  ('Δρ. Αγγελική Χατζημιχάλη', 'Dr. Angeliki Chatzimichali', 'Δρ. Λαογραφίας', 'Πανεπιστήμιο Αθηνών'),
  ('Νικόλαος Πολίτης', 'Nikolaos Politis', 'Καθηγητής Λαογραφίας', 'Πανεπιστήμιο Αθηνών'),
  ('Δρ. Ευγενία Δρακοπούλου', 'Dr. Evgenia Drakopoulou', 'Ιστορικός Τέχνης', 'Μουσείο Μπενάκη')
ON CONFLICT DO NOTHING;

-- ══════════════════════════════════════════════════════════════════════
--  TRIGGER: auto-update updated_at on costumes
-- ══════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER costumes_updated_at
  BEFORE UPDATE ON costumes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ══════════════════════════════════════════════════════════════════════
--  NOTES FOR NEXT STEPS
-- ══════════════════════════════════════════════════════════════════════
-- 1. Migrate to Next.js/Astro for true dynamic routes:
--    /regions/[slug], /costumes/[slug], /customs/[slug]
-- 2. Add Stripe webhooks → update subscriptions table
-- 3. Implement full-text search endpoint via Supabase RPC:
--    SELECT * FROM costumes WHERE to_tsvector('simple', name||' '||description)
--                                @@ plainto_tsquery('simple', $1)
-- 4. Add Mapbox/Leaflet cluster layer using lat/lng from regions + events
-- 5. model-viewer GLB URLs → store in costumes.model_glb_url
-- ══════════════════════════════════════════════════════════════════════
