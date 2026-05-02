-- ============================================================
--  HELLAS HERITAGE — PostgreSQL Schema v1.0
--  Τρέξε αυτό το αρχείο στο Supabase SQL Editor ή σε
--  οποιοδήποτε PostgreSQL 14+ περιβάλλον.
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";   -- για full-text search

-- ──────────────────────────────────────────────────────────────
-- 1. REGIONS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE regions (
    region_id       SERIAL PRIMARY KEY,
    name_gr         VARCHAR(100) NOT NULL,
    name_en         VARCHAR(100) NOT NULL,
    slug            VARCHAR(120) UNIQUE NOT NULL,
    region_type     VARCHAR(20)  NOT NULL CHECK (region_type IN ('ηπειρος','νησι','νομος','πολη')),
    parent_id       INTEGER REFERENCES regions(region_id) ON DELETE SET NULL,
    latitude        DECIMAL(9,6),
    longitude       DECIMAL(9,6),
    description_gr  TEXT,
    description_en  TEXT,
    thumbnail_url   VARCHAR(1000),
    map_svg_path    TEXT,           -- SVG path για interactive χάρτη
    is_published    BOOLEAN DEFAULT TRUE,
    sort_order      INTEGER DEFAULT 0,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_regions_slug   ON regions(slug);
CREATE INDEX idx_regions_type   ON regions(region_type);
CREATE INDEX idx_regions_parent ON regions(parent_id);

-- ──────────────────────────────────────────────────────────────
-- 2. COSTUMES (Παραδοσιακές Φορεσιές)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE costumes (
    costume_id      SERIAL PRIMARY KEY,
    region_id       INTEGER NOT NULL REFERENCES regions(region_id) ON DELETE RESTRICT,
    name_gr         VARCHAR(200) NOT NULL,
    name_en         VARCHAR(200),
    slug            VARCHAR(250) UNIQUE NOT NULL,
    gender          VARCHAR(20)  NOT NULL CHECK (gender IN ('ΑΝΔΡΙΚΗ','ΓΥΝΑΙΚΕΙΑ','ΠΑΙΔΙΚΗ','ΜΙΚΤΗ')),
    period_start    INTEGER,
    period_end      INTEGER,      -- NULL = ακόμα σε χρήση
    occasion        VARCHAR(300),
    materials       TEXT[],       -- π.χ. ARRAY['μετάξι','βελούδο']
    colors          TEXT[],
    history_gr      TEXT,
    history_en      TEXT,
    symbolism_gr    TEXT,
    symbolism_en    TEXT,
    care_notes_gr   TEXT,
    thumbnail_url   VARCHAR(1000),
    is_premium      BOOLEAN DEFAULT FALSE,
    is_published    BOOLEAN DEFAULT TRUE,
    view_count      INTEGER DEFAULT 0,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_costumes_region  ON costumes(region_id);
CREATE INDEX idx_costumes_gender  ON costumes(gender);
CREATE INDEX idx_costumes_premium ON costumes(is_premium);
CREATE INDEX idx_costumes_slug    ON costumes(slug);
CREATE INDEX idx_costumes_fts     ON costumes USING gin(to_tsvector('greek', name_gr || ' ' || COALESCE(history_gr,'')));

-- ──────────────────────────────────────────────────────────────
-- 3. CUSTOMS (Έθιμα & Παραδόσεις)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE customs (
    custom_id           SERIAL PRIMARY KEY,
    region_id           INTEGER NOT NULL REFERENCES regions(region_id) ON DELETE RESTRICT,
    name_gr             VARCHAR(200) NOT NULL,
    name_en             VARCHAR(200),
    slug                VARCHAR(250) UNIQUE NOT NULL,
    category            VARCHAR(30) NOT NULL CHECK (category IN (
                            'ΓΑΜΗΛΙΟ','ΘΡΗΣΚΕΥΤΙΚΟ','ΑΓΡΟΤΙΚΟ',
                            'ΕΠΟΧΙΑΚΟ','ΚΟΙΝΩΝΙΚΟ','ΕΠΕΤΕΙΑΚΟ'
                        )),
    period_of_year      VARCHAR(100),   -- π.χ. 'Ιανουάριος - Φεβρουάριος'
    description_gr      TEXT NOT NULL,
    description_en      TEXT,
    ritual_steps_gr     JSONB,   -- [{step:1, title:'', description:''}]
    ritual_steps_en     JSONB,
    related_costume_ids INTEGER[],
    thumbnail_url       VARCHAR(1000),
    is_premium          BOOLEAN DEFAULT FALSE,
    is_published        BOOLEAN DEFAULT TRUE,
    view_count          INTEGER DEFAULT 0,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_customs_region   ON customs(region_id);
CREATE INDEX idx_customs_category ON customs(category);
CREATE INDEX idx_customs_premium  ON customs(is_premium);
CREATE INDEX idx_customs_slug     ON customs(slug);

-- ──────────────────────────────────────────────────────────────
-- 4. MEDIA (Φωτογραφίες, Βίντεο, Ήχοι)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE media (
    media_id        SERIAL PRIMARY KEY,
    entity_type     VARCHAR(20) NOT NULL CHECK (entity_type IN (
                        'COSTUME','CUSTOM','REGION','ARTICLE','EVENT'
                    )),
    entity_id       INTEGER NOT NULL,
    media_type      VARCHAR(20) NOT NULL CHECK (media_type IN (
                        'IMAGE','VIDEO','AUDIO','DOCUMENT','3D_MODEL'
                    )),
    url             VARCHAR(1000) NOT NULL,
    thumbnail_url   VARCHAR(1000),
    title_gr        VARCHAR(300),
    title_en        VARCHAR(300),
    caption_gr      TEXT,
    caption_en      TEXT,
    credits         VARCHAR(300),
    license         VARCHAR(100) DEFAULT 'Με επιφύλαξη παντός δικαιώματος',
    is_primary      BOOLEAN DEFAULT FALSE,
    is_premium      BOOLEAN DEFAULT FALSE,
    sort_order      INTEGER DEFAULT 0,
    file_size_bytes BIGINT,
    duration_sec    INTEGER,
    width_px        INTEGER,
    height_px       INTEGER,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_media_entity ON media(entity_type, entity_id);
CREATE INDEX idx_media_primary ON media(entity_type, entity_id, is_primary);

-- ──────────────────────────────────────────────────────────────
-- 5. TAGS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE tags (
    tag_id   SERIAL PRIMARY KEY,
    name_gr  VARCHAR(80) UNIQUE NOT NULL,
    name_en  VARCHAR(80),
    slug     VARCHAR(80) UNIQUE NOT NULL,
    color    VARCHAR(7)   -- hex color π.χ. '#1A3A6B'
);

CREATE TABLE costume_tags (
    costume_id INTEGER NOT NULL REFERENCES costumes(costume_id) ON DELETE CASCADE,
    tag_id     INTEGER NOT NULL REFERENCES tags(tag_id) ON DELETE CASCADE,
    PRIMARY KEY (costume_id, tag_id)
);

CREATE TABLE custom_tags (
    custom_id INTEGER NOT NULL REFERENCES customs(custom_id) ON DELETE CASCADE,
    tag_id    INTEGER NOT NULL REFERENCES tags(tag_id) ON DELETE CASCADE,
    PRIMARY KEY (custom_id, tag_id)
);

-- ──────────────────────────────────────────────────────────────
-- 6. ARTISTS / CREATORS (Λαογράφοι, Δημιουργοί)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE artists (
    artist_id     SERIAL PRIMARY KEY,
    full_name     VARCHAR(200) NOT NULL,
    slug          VARCHAR(220) UNIQUE NOT NULL,
    specialty     VARCHAR(200),
    bio_gr        TEXT,
    bio_en        TEXT,
    photo_url     VARCHAR(1000),
    website       VARCHAR(500),
    region_id     INTEGER REFERENCES regions(region_id) ON DELETE SET NULL,
    period_active VARCHAR(100),
    is_published  BOOLEAN DEFAULT TRUE,
    created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE artist_costumes (
    artist_id  INTEGER NOT NULL REFERENCES artists(artist_id) ON DELETE CASCADE,
    costume_id INTEGER NOT NULL REFERENCES costumes(costume_id) ON DELETE CASCADE,
    role       VARCHAR(100),   -- π.χ. 'Κατασκευαστής', 'Ερευνητής'
    PRIMARY KEY (artist_id, costume_id)
);

-- ──────────────────────────────────────────────────────────────
-- 7. EVENTS (Εκδηλώσεις & Φεστιβάλ)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE events (
    event_id           SERIAL PRIMARY KEY,
    name_gr            VARCHAR(200) NOT NULL,
    name_en            VARCHAR(200),
    slug               VARCHAR(250) UNIQUE NOT NULL,
    event_type         VARCHAR(30) NOT NULL CHECK (event_type IN (
                           'ΦΕΣΤΙΒΑΛ','ΕΚΘΕΣΗ','ΠΑΡΕΛΑΣΗ',
                           'ΣΥΝΕΔΡΙΟ','ΕΚΠΑΙΔΕΥΤΙΚΟ','ΠΑΝΗΓΥΡΙ'
                       )),
    start_date         DATE NOT NULL,
    end_date           DATE,
    location_gr        VARCHAR(300),
    location_en        VARCHAR(300),
    description_gr     TEXT,
    description_en     TEXT,
    website_url        VARCHAR(500),
    thumbnail_url      VARCHAR(1000),
    is_recurring       BOOLEAN DEFAULT FALSE,
    recurrence_pattern VARCHAR(50),
    is_published       BOOLEAN DEFAULT TRUE,
    created_at         TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE event_regions (
    event_id  INTEGER NOT NULL REFERENCES events(event_id) ON DELETE CASCADE,
    region_id INTEGER NOT NULL REFERENCES regions(region_id) ON DELETE CASCADE,
    PRIMARY KEY (event_id, region_id)
);

-- ──────────────────────────────────────────────────────────────
-- 8. SOURCES (Βιβλιογραφία)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE sources (
    source_id        SERIAL PRIMARY KEY,
    title            VARCHAR(500) NOT NULL,
    author           VARCHAR(300),
    publication_year INTEGER,
    source_type      VARCHAR(20) NOT NULL CHECK (source_type IN (
                         'ΒΙΒΛΙΟ','ΑΡΘΡΟ','ΔΙΑΤΡΙΒΗ','ΑΡΧΕΙΟ','WEBSITE','ΠΡΟΦΟΡΙΚΗ'
                     )),
    publisher        VARCHAR(300),
    isbn             VARCHAR(20),
    url              VARCHAR(1000),
    language         CHAR(2) DEFAULT 'gr',
    notes            TEXT,
    created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE costume_sources (
    costume_id INTEGER NOT NULL REFERENCES costumes(costume_id) ON DELETE CASCADE,
    source_id  INTEGER NOT NULL REFERENCES sources(source_id) ON DELETE CASCADE,
    notes      TEXT,
    PRIMARY KEY (costume_id, source_id)
);

CREATE TABLE custom_sources (
    custom_id INTEGER NOT NULL REFERENCES customs(custom_id) ON DELETE CASCADE,
    source_id INTEGER NOT NULL REFERENCES sources(source_id) ON DELETE CASCADE,
    notes     TEXT,
    PRIMARY KEY (custom_id, source_id)
);

-- ──────────────────────────────────────────────────────────────
-- 9. ARTICLES (Blog / Εκπαιδευτικό Υλικό)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE articles (
    article_id          SERIAL PRIMARY KEY,
    title_gr            VARCHAR(500) NOT NULL,
    title_en            VARCHAR(500),
    slug                VARCHAR(550) UNIQUE NOT NULL,
    excerpt_gr          TEXT,
    excerpt_en          TEXT,
    content_gr          TEXT NOT NULL,
    content_en          TEXT,
    author_id           INTEGER,  -- FK → users added below
    category            VARCHAR(30) NOT NULL CHECK (category IN (
                            'ΦΟΡΕΣΙΕΣ','ΕΘΙΜΑ','ΙΣΤΟΡΙΑ',
                            'ΕΚΠΑΙΔΕΥΤΙΚΟ','NEWS','ΑΦΗΓΗΣΗ'
                        )),
    thumbnail_url       VARCHAR(1000),
    is_premium          BOOLEAN DEFAULT FALSE,
    is_published        BOOLEAN DEFAULT FALSE,
    published_at        TIMESTAMPTZ,
    reading_time_min    INTEGER,
    meta_title_gr       VARCHAR(300),
    meta_description_gr VARCHAR(400),
    meta_title_en       VARCHAR(300),
    meta_description_en VARCHAR(400),
    view_count          INTEGER DEFAULT 0,
    created_at          TIMESTAMPTZ DEFAULT NOW(),
    updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_articles_slug      ON articles(slug);
CREATE INDEX idx_articles_category  ON articles(category);
CREATE INDEX idx_articles_published ON articles(is_published, published_at DESC);

CREATE TABLE article_costumes (
    article_id INTEGER NOT NULL REFERENCES articles(article_id) ON DELETE CASCADE,
    costume_id INTEGER NOT NULL REFERENCES costumes(costume_id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, costume_id)
);

CREATE TABLE article_customs (
    article_id INTEGER NOT NULL REFERENCES articles(article_id) ON DELETE CASCADE,
    custom_id  INTEGER NOT NULL REFERENCES customs(custom_id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, custom_id)
);

-- ──────────────────────────────────────────────────────────────
-- 10. USERS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE users (
    user_id            SERIAL PRIMARY KEY,
    uuid               UUID UNIQUE DEFAULT uuid_generate_v4(),
    email              VARCHAR(255) UNIQUE NOT NULL,
    password_hash      VARCHAR(255),  -- NULL αν χρησιμοποιεί OAuth
    first_name         VARCHAR(100) NOT NULL,
    last_name          VARCHAR(100) NOT NULL,
    country            VARCHAR(100),
    preferred_language CHAR(2) DEFAULT 'gr',
    role               VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user','editor','moderator','admin')),
    avatar_url         VARCHAR(1000),
    is_verified        BOOLEAN DEFAULT FALSE,
    is_active          BOOLEAN DEFAULT TRUE,
    last_login         TIMESTAMPTZ,
    oauth_provider     VARCHAR(50),   -- 'google', 'facebook' κ.λπ.
    oauth_id           VARCHAR(200),
    created_at         TIMESTAMPTZ DEFAULT NOW(),
    updated_at         TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_uuid  ON users(uuid);

-- ──────────────────────────────────────────────────────────────
-- 11. SUBSCRIPTION PLANS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE plans (
    plan_id      SERIAL PRIMARY KEY,
    name_gr      VARCHAR(100) NOT NULL,
    name_en      VARCHAR(100) NOT NULL,
    slug         VARCHAR(100) UNIQUE NOT NULL,
    plan_type    VARCHAR(20) NOT NULL CHECK (plan_type IN (
                     'FREE','MONTHLY','ANNUAL','LIFETIME','INSTITUTIONAL'
                 )),
    price        DECIMAL(8,2) NOT NULL DEFAULT 0,
    currency     CHAR(3) DEFAULT 'EUR',
    features     JSONB,       -- {"costumes": "unlimited", "downloads": true, ...}
    max_devices  INTEGER DEFAULT 1,
    max_users    INTEGER DEFAULT 1,  -- για institutional
    stripe_price_id VARCHAR(200),
    is_active    BOOLEAN DEFAULT TRUE,
    sort_order   INTEGER DEFAULT 0,
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Βασικά πακέτα
INSERT INTO plans (name_gr, name_en, slug, plan_type, price, features, max_devices, sort_order) VALUES
('Δωρεάν',        'Free',             'free',         'FREE',          0.00,   '{"costumes":"limited","customs":"limited","map":true,"downloads":false}',    1, 1),
('Explorer',      'Explorer',         'explorer',     'MONTHLY',       4.99,   '{"costumes":"unlimited","customs":"unlimited","map":true,"downloads":true}',  3, 2),
('Heritage Annual','Heritage Annual', 'annual',       'ANNUAL',        39.99,  '{"costumes":"unlimited","customs":"unlimited","map":true,"downloads":true,"ebooks":true,"offline":true}', 3, 3),
('Lifetime Pass', 'Lifetime Pass',    'lifetime',     'LIFETIME',      149.99, '{"costumes":"unlimited","customs":"unlimited","map":true,"downloads":true,"ebooks":true,"offline":true,"vip":true}', 5, 4),
('Φοιτητικό',    'Student',          'student',      'MONTHLY',       1.99,   '{"costumes":"unlimited","customs":"unlimited","map":true,"downloads":true}',  2, 5),
('Εκπαιδευτικό', 'Institutional',    'institutional','INSTITUTIONAL', 199.00, '{"costumes":"unlimited","customs":"unlimited","map":true,"downloads":true,"ebooks":true,"dashboard":true}', 30, 6);

-- ──────────────────────────────────────────────────────────────
-- 12. SUBSCRIPTIONS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE subscriptions (
    subscription_id       SERIAL PRIMARY KEY,
    user_id               INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    plan_id               INTEGER NOT NULL REFERENCES plans(plan_id),
    status                VARCHAR(20) NOT NULL CHECK (status IN (
                              'ACTIVE','CANCELLED','EXPIRED','TRIAL','PAUSED'
                          )),
    start_date            DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date              DATE,
    trial_end_date        DATE,
    stripe_subscription_id VARCHAR(200),
    stripe_customer_id    VARCHAR(200),
    amount_paid           DECIMAL(8,2),
    currency              CHAR(3) DEFAULT 'EUR',
    discount_code         VARCHAR(50),
    cancel_at_period_end  BOOLEAN DEFAULT FALSE,
    cancelled_at          TIMESTAMPTZ,
    cancel_reason         TEXT,
    created_at            TIMESTAMPTZ DEFAULT NOW(),
    updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subs_user   ON subscriptions(user_id);
CREATE INDEX idx_subs_status ON subscriptions(status);

-- ──────────────────────────────────────────────────────────────
-- 13. USER BOOKMARKS
-- ──────────────────────────────────────────────────────────────
CREATE TABLE user_bookmarks (
    bookmark_id  SERIAL PRIMARY KEY,
    user_id      INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    entity_type  VARCHAR(20) NOT NULL CHECK (entity_type IN ('COSTUME','CUSTOM','ARTICLE','REGION','EVENT')),
    entity_id    INTEGER NOT NULL,
    created_at   TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user_id, entity_type, entity_id)
);

CREATE INDEX idx_bookmarks_user ON user_bookmarks(user_id);

-- ──────────────────────────────────────────────────────────────
-- 14. USER PROGRESS / GAMIFICATION
-- ──────────────────────────────────────────────────────────────
CREATE TABLE user_progress (
    progress_id  SERIAL PRIMARY KEY,
    user_id      INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    entity_type  VARCHAR(20) NOT NULL,
    entity_id    INTEGER NOT NULL,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    points_earned INTEGER DEFAULT 0,
    UNIQUE (user_id, entity_type, entity_id)
);

CREATE TABLE badges (
    badge_id     SERIAL PRIMARY KEY,
    name_gr      VARCHAR(100) NOT NULL,
    name_en      VARCHAR(100),
    description_gr TEXT,
    icon_url     VARCHAR(500),
    condition    JSONB,  -- {"type":"regions_visited","count":5}
    points       INTEGER DEFAULT 0
);

CREATE TABLE user_badges (
    user_id   INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    badge_id  INTEGER NOT NULL REFERENCES badges(badge_id) ON DELETE CASCADE,
    earned_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, badge_id)
);

-- ──────────────────────────────────────────────────────────────
-- 15. HELPFUL VIEWS
-- ──────────────────────────────────────────────────────────────

-- Costumes with region name (για UI listing)
CREATE VIEW v_costumes_full AS
SELECT
    c.*,
    r.name_gr  AS region_name_gr,
    r.name_en  AS region_name_en,
    r.slug     AS region_slug,
    (SELECT url FROM media WHERE entity_type='COSTUME' AND entity_id=c.costume_id AND is_primary=TRUE LIMIT 1) AS primary_image
FROM costumes c
JOIN regions r USING (region_id)
WHERE c.is_published = TRUE;

-- Customs with region name
CREATE VIEW v_customs_full AS
SELECT
    cu.*,
    r.name_gr AS region_name_gr,
    r.name_en AS region_name_en,
    r.slug    AS region_slug
FROM customs cu
JOIN regions r USING (region_id)
WHERE cu.is_published = TRUE;

-- Active subscriptions per user
CREATE VIEW v_active_subscriptions AS
SELECT
    s.*,
    p.name_gr   AS plan_name_gr,
    p.plan_type,
    p.features
FROM subscriptions s
JOIN plans p USING (plan_id)
WHERE s.status IN ('ACTIVE','TRIAL')
  AND (s.end_date IS NULL OR s.end_date >= CURRENT_DATE);

-- ──────────────────────────────────────────────────────────────
-- 16. UPDATED_AT TRIGGER
-- ──────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_regions_updated_at    BEFORE UPDATE ON regions    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_costumes_updated_at   BEFORE UPDATE ON costumes   FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_customs_updated_at    BEFORE UPDATE ON customs    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_articles_updated_at   BEFORE UPDATE ON articles   FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_users_updated_at      BEFORE UPDATE ON users      FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_subs_updated_at       BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
--  ΤΕΛΟΣ SCHEMA — Hellas Heritage v1.0
--  Για βοήθεια με Supabase setup ή API integration
--  επικοινωνήστε με την ομάδα ανάπτυξης.
-- ============================================================
