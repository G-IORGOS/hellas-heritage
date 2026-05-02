/*
 * HELLAS HERITAGE — supabase.js
 * Φορτώνει δεδομένα από Supabase και αντικαθιστά το HH object.
 * Εάν το Supabase είναι offline, χρησιμοποιεί τα στατικά δεδομένα του data.js.
 */

const SUPABASE_URL = 'https://ouysehsxdychgbvwdfhy.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ikTg1GHHecS8R1NGvpq_qA_-ahnvX1L';

// ── Promise που resolve-αρει όταν τα δεδομένα είναι έτοιμα ──
let _resolveHH;
window.__HH_READY = new Promise(resolve => { _resolveHH = resolve; });

// ── Column name mapping (snake_case → camelCase) ─────────
function mapRegion(r) {
  return {
    id: r.id,
    name: r.name,
    nameEn: r.name_en,
    type: r.type,
    slug: r.slug,
    description: r.description,
    descriptionEn: r.description_en,
    image: r.image,
    lat: r.lat,
    lng: r.lng,
    costumesCount: r.costumes_count,
    customsCount: r.customs_count,
    featured: r.featured
  };
}

function mapCostume(c) {
  return {
    id: c.id,
    name: c.name,
    nameEn: c.name_en,
    slug: c.slug,
    regionId: c.region_id,
    gender: c.gender,
    period: c.period,
    occasion: c.occasion,
    materials: c.materials || [],
    colors: c.colors || [],
    description: c.description,
    history_gr: c.description,
    symbolism: c.symbolism,
    image: c.image,
    gallery: [],
    isPremium: c.is_premium,
    featured: c.featured
  };
}

function mapCustom(cu) {
  return {
    id: cu.id,
    name: cu.name,
    nameEn: cu.name_en,
    slug: cu.slug,
    regionId: cu.region_id,
    category: cu.category,
    periodOfYear: cu.period_of_year,
    description: cu.description,
    image: cu.image,
    isPremium: cu.is_premium,
    featured: cu.featured,
    steps: []
  };
}

function mapEvent(e) {
  return {
    id: e.id,
    name: e.name,
    nameEn: e.name_en,
    slug: e.slug,
    type: e.type,
    date: e.date,
    location: e.location,
    description: e.description,
    image: e.image,
    website: e.website
  };
}

// ── Fetch από Supabase ────────────────────────────────────
(async function loadFromSupabase() {
  try {
    // Περιμένουμε το Supabase SDK να φορτώσει
    if (!window.supabase || !window.supabase.createClient) {
      throw new Error('Supabase SDK not loaded');
    }

    const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    const [regRes, cosRes, cuRes, evRes] = await Promise.all([
      sb.from('regions').select('*').order('id'),
      sb.from('costumes').select('*').order('id'),
      sb.from('customs').select('*').order('id'),
      sb.from('events').select('*').order('id'),
    ]);

    // Ενημέρωσε το HH object με Supabase δεδομένα
    if (regRes.data?.length) window.HH.regions  = regRes.data.map(mapRegion);
    if (cosRes.data?.length) window.HH.costumes = cosRes.data.map(mapCostume);
    if (cuRes.data?.length)  window.HH.customs  = cuRes.data.map(mapCustom);
    if (evRes.data?.length)  window.HH.events   = evRes.data.map(mapEvent);

    console.log('✅ Hellas Heritage: δεδομένα φορτώθηκαν από Supabase',
      `(${window.HH.regions.length} περιοχές, ${window.HH.costumes.length} φορεσιές)`);

  } catch (err) {
    console.warn('⚠️ Supabase μη διαθέσιμο — χρήση στατικών δεδομένων.', err.message);
  }

  // Είτε Supabase είτε fallback, σηματοδότησε ότι τα data είναι έτοιμα
  _resolveHH(window.HH);
})();
