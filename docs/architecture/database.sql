-- PostgreSQL şema taslağı

CREATE TYPE toxicity_level AS ENUM ('non_toxic', 'caution', 'toxic', 'unknown');
CREATE TYPE subscription_plan AS ENUM ('free', 'premium');

CREATE TABLE species (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    common_name TEXT NOT NULL,
    latin_name TEXT NOT NULL,
    category TEXT NOT NULL, -- mantar, otsu, ağaç vb.
    appearance JSONB NOT NULL, -- renk, yaprak, şapka açıklamaları
    habitat TEXT[],
    similar_species UUID[] DEFAULT '{}',
    toxicity toxicity_level NOT NULL DEFAULT 'unknown',
    culinary_notes TEXT,
    medicinal_notes TEXT,
    survival_uses TEXT,
    image_refs TEXT[],
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE toxicity_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    species_id UUID REFERENCES species(id) ON DELETE CASCADE,
    risk_summary TEXT NOT NULL,
    symptoms TEXT[],
    emergency_actions TEXT[],
    disable_recipes BOOLEAN DEFAULT false
);

CREATE TABLE guides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    section TEXT NOT NULL, -- fire, shelter vb.
    body_md TEXT NOT NULL,
    is_premium BOOLEAN DEFAULT true,
    offline_priority INT DEFAULT 0
);

CREATE TABLE survival_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    guide_id UUID REFERENCES guides(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL,
    media_type TEXT CHECK (media_type IN ('image','video','diagram'))
);

CREATE TABLE users (
    id UUID PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    display_name TEXT,
    auth_provider TEXT NOT NULL,
    locale TEXT DEFAULT 'tr',
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE subscriptions (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    plan subscription_plan NOT NULL DEFAULT 'free',
    stripe_customer_id TEXT,
    apple_receipt TEXT,
    google_purchase_token TEXT,
    renewed_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ
);

CREATE TABLE identifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    image_storage_path TEXT NOT NULL,
    inference JSONB NOT NULL, -- top3 species + skor
    primary_species UUID REFERENCES species(id),
    confidence NUMERIC(4,3) NOT NULL,
    toxicity toxicity_level,
    workflow_state TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE user_markers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    marker_type TEXT CHECK (marker_type IN ('camp','water','sighting','danger')),
    coordinates GEOGRAPHY(POINT, 4326) NOT NULL,
    notes TEXT,
    related_species UUID REFERENCES species(id),
    is_private BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE map_tiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    region_code TEXT NOT NULL,
    tile_url TEXT NOT NULL,
    checksum TEXT NOT NULL,
    offline_size_mb NUMERIC(6,2)
);

CREATE TABLE chat_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    safety_flag BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
    role TEXT CHECK (role IN ('user','assistant','system')) NOT NULL,
    content TEXT NOT NULL,
    safety_block_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- İndeksler
CREATE INDEX idx_species_name ON species USING GIN (to_tsvector('turkish', common_name));
CREATE INDEX idx_identifications_user ON identifications(user_id);
CREATE INDEX idx_markers_geo ON user_markers USING GIST (coordinates);
CREATE INDEX idx_guides_section ON guides(section);

