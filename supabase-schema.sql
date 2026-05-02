-- ══════════════════════════════════════════════════════════
--  HELLAS HERITAGE — Supabase Schema + Sample Data
--  Τρέξε αυτό στο: Supabase → SQL Editor → New query
-- ══════════════════════════════════════════════════════════

-- ── TABLES ────────────────────────────────────────────────

create table if not exists regions (
  id int primary key,
  name text not null,
  name_en text,
  type text,
  slug text unique,
  description text,
  description_en text,
  image text,
  lat numeric,
  lng numeric,
  costumes_count int default 0,
  customs_count int default 0,
  featured boolean default false
);

create table if not exists costumes (
  id int primary key,
  name text not null,
  name_en text,
  slug text unique,
  region_id int references regions(id),
  gender text,
  period text,
  occasion text,
  materials text[],
  colors text[],
  description text,
  symbolism text,
  image text,
  is_premium boolean default false,
  featured boolean default false
);

create table if not exists customs (
  id int primary key,
  name text not null,
  name_en text,
  slug text unique,
  region_id int references regions(id),
  category text,
  period_of_year text,
  description text,
  image text,
  is_premium boolean default false,
  featured boolean default false
);

create table if not exists events (
  id int primary key,
  name text not null,
  name_en text,
  slug text,
  type text,
  date text,
  location text,
  description text,
  image text,
  website text
);

-- ── ROW LEVEL SECURITY (public read) ─────────────────────

alter table regions enable row level security;
alter table costumes enable row level security;
alter table customs enable row level security;
alter table events enable row level security;

create policy "Public read regions" on regions for select using (true);
create policy "Public read costumes" on costumes for select using (true);
create policy "Public read customs" on customs for select using (true);
create policy "Public read events" on events for select using (true);

-- ── DATA: REGIONS ─────────────────────────────────────────

insert into regions (id, name, name_en, type, slug, description, description_en, image, lat, lng, costumes_count, customs_count, featured) values
(1, 'Μακεδονία', 'Macedonia', 'ηπειρος', 'makedonia',
 'Η Μακεδονία είναι η μεγαλύτερη γεωγραφική περιοχή της Ελλάδας με πλούσια πολιτιστική κληρονομιά, χαρακτηριστικές φορεσιές με έντονα κεντήματα και παραδόσεις που χρονολογούνται από την αρχαιότητα.',
 'Macedonia is the largest geographical region of Greece with rich cultural heritage.',
 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', 40.6401, 22.9444, 12, 18, true),

(2, 'Θράκη', 'Thrace', 'ηπειρος', 'thraki',
 'Η Θράκη αποτελεί σταυροδρόμι πολιτισμών. Τα έθιμά της, όπως το Αναστενάρια και το Δρομένο, είναι μοναδικά στον κόσμο και έχουν ενταχθεί στην άυλη πολιτιστική κληρονομιά της UNESCO.',
 'Thrace is a crossroads of civilizations. Its customs such as the Anastenaria are unique worldwide.',
 'https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=800', 41.1496, 25.4016, 8, 22, true),

(3, 'Ήπειρος', 'Epirus', 'ηπειρος', 'ipeiros',
 'Η Ήπειρος με τα απόκρημνα βουνά της και τα αρχαία Ζαγοροχώρια διατηρεί ζωντανές παραδόσεις αιώνων. Οι φορεσιές της με τα χρυσοκέντητα είναι από τις πιο εντυπωσιακές στην Ελλάδα.',
 'Epirus with its rugged mountains and ancient Zagori villages preserves centuries-old traditions.',
 'https://images.unsplash.com/photo-1571863533956-01c88e79957e?w=800', 39.6650, 20.8536, 10, 15, true),

(4, 'Πελοπόννησος', 'Peloponnese', 'ηπειρος', 'peloponisos',
 'Η Πελοπόννησος, γη ηρώων και μυστηρίων, αποτελεί την καρδιά της αρχαίας ελληνικής ιστορίας.',
 'The Peloponnese, land of heroes and mysteries, is the heart of ancient Greek history.',
 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800', 37.5079, 22.3731, 9, 14, false),

(5, 'Κρήτη', 'Crete', 'νησι', 'kriti',
 'Η Κρήτη έχει τη δική της ξεχωριστή κουλτούρα και ταυτότητα. Η κρητική φορεσιά — ιδιαίτερα η ανδρική με τις βράκες — είναι αναγνωρίσιμη σε όλο τον κόσμο ως σύμβολο της κρητικής υπερηφάνειας.',
 'Crete has its own distinct culture. The Cretan vraka breeches are recognized worldwide.',
 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800', 35.2401, 24.8093, 14, 25, true),

(6, 'Κυκλάδες', 'Cyclades', 'νησι', 'kyklades',
 'Τα νησιά των Κυκλάδων με τη χαρακτηριστική τους λευκή αρχιτεκτονική κρύβουν πλούσιες παραδόσεις.',
 'The Cycladic islands with their characteristic white architecture hide rich traditions.',
 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800', 37.1543, 25.2686, 11, 16, false),

(7, 'Δωδεκάνησα', 'Dodecanese', 'νησι', 'dodekanisa',
 'Τα Δωδεκάνησα, λόγω της πολυτάραχης ιστορίας τους, έχουν αναπτύξει μοναδικές παραδόσεις.',
 'The Dodecanese have developed unique traditions due to their turbulent history.',
 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800', 36.4341, 28.2176, 7, 12, false),

(8, 'Ιόνια Νησιά', 'Ionian Islands', 'νησι', 'ionia-nisia',
 'Τα Επτάνησα με τη βενετική επίδραση έχουν ανεπτύξει μια μοναδική ελληνική κουλτούρα.',
 'The Ionian Islands with Venetian influence have developed a unique Greek culture.',
 'https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=800', 38.1747, 20.4907, 8, 13, false);

-- ── DATA: COSTUMES ────────────────────────────────────────

insert into costumes (id, name, name_en, slug, region_id, gender, period, occasion, materials, colors, description, symbolism, image, is_premium, featured) values
(1, 'Φορεσιά Αμαλία', 'Amalia Dress', 'foresia-amalia', 1, 'ΓΥΝΑΙΚΕΙΑ', '1836 - σήμερα',
 'Επίσημες εθνικές εορτές, γάμοι, παρελάσεις',
 ARRAY['μετάξι','βελούδο','χρυσονήματα','δαντέλα'],
 ARRAY['κόκκινο','μπλε','χρυσό'],
 'Η φορεσιά Αμαλία πήρε το όνομά της από την πρώτη βασίλισσα της σύγχρονης Ελλάδας, Αμαλία του Όλντενμπουργκ. Εισήχθη ως η επίσημη ελληνική εθνική φορεσιά για γυναίκες κατά τον 19ο αιώνα.',
 'Τα χρώματά της αντικατοπτρίζουν τη βυζαντινή παράδοση και την ελληνική εθνική ταυτότητα.',
 'https://images.unsplash.com/photo-1594387303756-0c25e8f7b97a?w=600', false, true),

(2, 'Κρητική Βράκα (Ανδρική)', 'Cretan Vraka', 'kritiki-vraka', 5, 'ΑΝΔΡΙΚΗ', '17ος αιώνας - σήμερα',
 'Καθημερινή χρήση στην Κρήτη, εορτές, πανηγύρια',
 ARRAY['μαύρο ύφασμα (σέρτζι)','ύφασμα βελούδο','δέρμα (μπότες)'],
 ARRAY['μαύρο','λευκό'],
 'Η κρητική ανδρική φορεσιά με τη χαρακτηριστική βράκα (πλατύ παντελόνι) και τη μαύρη κρητική μαντίλα είναι ένα από τα πιο αναγνωρίσιμα σύμβολα της Κρήτης.',
 'Το μαύρο χρώμα αντιπροσωπεύει το πένθος για την τελευταία κρητική επανάσταση.',
 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600', false, true),

(3, 'Σαρακατσάνα Φορεσιά', 'Sarakatsani Costume', 'sarakatsana', 1, 'ΓΥΝΑΙΚΕΙΑ', '18ος - 20ός αιώνας',
 'Γάμοι, πανηγύρια Σαρακατσάνων',
 ARRAY['μαλλί','βαμβάκι','ασημένια κοσμήματα'],
 ARRAY['άσπρο','μαύρο','κόκκινο'],
 'Οι Σαρακατσάνοι ήταν νομαδικοί κτηνοτρόφοι της βόρειας Ελλάδας. Η φορεσιά τους χαρακτηρίζεται από πλούσια χρωματιστά κεντήματα.',
 'Κάθε μοτίβο στα κεντήματα έχει συγκεκριμένο νόημα: ο ήλιος για ζωή, το δέντρο για γονιμότητα.',
 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600', true, true),

(4, 'Θρακιώτικη Φορεσιά', 'Thracian Costume', 'thrakiotiki', 2, 'ΓΥΝΑΙΚΕΙΑ', '19ος αιώνας',
 'Γάμοι, θρησκευτικές εορτές',
 ARRAY['μετάξι','χρυσοκλωστή','ασήμι'],
 ARRAY['σκούρο κόκκινο','πράσινο','χρυσό','μαύρο'],
 'Η θρακιώτικη γυναικεία φορεσιά είναι γνωστή για τα εξαιρετικά πολύχρωμα κεντήματα και τα πολλαπλά στρώματα.',
 'Τα γεωμετρικά μοτίβα αντικατοπτρίζουν αρχαία σύμβολα γονιμότητας και προστασίας.',
 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600', true, false),

(5, 'Ηπειρώτικη Φορεσιά', 'Epiriot Costume', 'ipeirotiki', 3, 'ΓΥΝΑΙΚΕΙΑ', '18ος - 19ος αιώνας',
 'Γάμοι, Απόκριες, πανηγύρια',
 ARRAY['μαλλί','μετάξι','χρυσονήματα','ασημένιες ζώνες'],
 ARRAY['σκούρο μπλε','μαύρο','χρυσό'],
 'Η ηπειρώτικη φορεσιά ξεχωρίζει για τις εντυπωσιακές χρυσόκλωστες ζώνες και τα πλούσια κεντήματα.',
 'Η ασημένια ζώνη αντικατοπτρίζει την οικονομική κατάσταση της οικογένειας.',
 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600', false, false),

(6, 'Τσολιάς (Εύζωνας)', 'Tsolias (Evzone)', 'tsolias-evzonas', 1, 'ΑΝΔΡΙΚΗ', '18ος αιώνας - σήμερα',
 'Εθνικές εορτές, παρελάσεις, Αλλαγή Φρουράς',
 ARRAY['λευκό λινό (φουστανέλα)','κόκκινο βελούδο','δέρμα'],
 ARRAY['λευκό','κόκκινο','μπλε'],
 'Η φορεσιά του Τσολιά (Εύζωνα) με τη φουστανέλα των 400 πτυχών είναι το πιο διεθνώς αναγνωρισμένο ελληνικό σύμβολο.',
 'Οι 400 πτυχές = 400 χρόνια Οθωμανικής κατοχής. Η κόκκινη τζακέτα συμβολίζει το αίμα των αγωνιστών.',
 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=600', false, true),

(7, 'Κυκλαδίτικη Φορεσιά', 'Cycladic Costume', 'kykladitiki', 6, 'ΓΥΝΑΙΚΕΙΑ', '17ος - 19ος αιώνας',
 'Γάμοι, θρησκευτικές γιορτές',
 ARRAY['μετάξι','χρυσοκλωστή','δαντέλα'],
 ARRAY['λευκό','χρυσό','γαλάζιο'],
 'Η κυκλαδίτικη φορεσιά διαφέρει από νησί σε νησί, αλλά μοιράζεται κοινά χαρακτηριστικά: λευκά και χρυσά χρώματα.',
 'Το λευκό χρώμα αντιπροσωπεύει την αγνότητα και τη θάλασσα.',
 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600', true, false),

(8, 'Μακεδόνικη Ανδρική Φορεσιά', 'Macedonian Male Costume', 'makedoniki-andrika', 1, 'ΑΝΔΡΙΚΗ', '18ος - 19ος αιώνας',
 'Γάμοι, πανηγύρια, εθνικές εορτές',
 ARRAY['μαύρο ύφασμα','ασήμι','χρυσονήματα'],
 ARRAY['μαύρο','λευκό','ασημί'],
 'Η βόρεια μακεδόνικη ανδρική φορεσιά χαρακτηρίζεται από τον μαύρο γκλαμπούρ με πλούσια ασημένια κεντήματα.',
 'Τα ασημένια κεντήματα στον γκλαμπούρ δείχνουν την κοινωνική θέση του άνδρα.',
 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600', true, false);

-- ── DATA: CUSTOMS ─────────────────────────────────────────

insert into customs (id, name, name_en, slug, region_id, category, period_of_year, description, image, is_premium, featured) values
(1, 'Αναστενάρια', 'Anastenaria Fire-Walking', 'anastenaria', 2, 'ΘΡΗΣΚΕΥΤΙΚΟ',
 '21 Μαΐου (Αγίου Κωνσταντίνου)',
 'Τα Αναστενάρια είναι ένα από τα πιο εντυπωσιακά και μυστηριακά έθιμα της Ελλάδας. Οι Αναστενάρηδες περπατούν ξυπόλητοι σε αναμμένα κάρβουνα κρατώντας εικόνες των Αγίων Κωνσταντίνου και Ελένης.',
 'https://images.unsplash.com/photo-1504192010706-dd7f569ee2be?w=600', false, true),

(2, 'Κρητικός Γάμος', 'Cretan Wedding', 'kritikos-gamos', 5, 'ΓΑΜΗΛΙΟ',
 'Κυρίως καλοκαίρι',
 'Ο κρητικός γάμος είναι ένα πολυήμερο γεγονός που ξεκινά από Παρασκευή και τελειώνει Κυριακή. Χαρακτηρίζεται από λυράρηδες, ριζίτικα τραγούδια και το έθιμο της βράκας για τον γαμπρό.',
 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600', false, true),

(3, 'Μαμλαρόι (Καρναβάλι Νάουσας)', 'Mamlaro (Naoussa Carnival)', 'mamlaroi-naousa', 1, 'ΕΠΟΧΙΑΚΟ',
 'Αποκριές (Φεβρουάριος - Μάρτιος)',
 'Το Καρναβάλι της Νάουσας είναι ένα από τα παλαιότερα και εντυπωσιακότερα της Ελλάδας. Οι Γενίτσαροι και οι Μπούλες με τις παραδοσιακές τους στολές χορεύουν στους δρόμους της πόλης.',
 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600', true, true),

(4, 'Κλήδονας', 'Klidonas', 'klidonas', 6, 'ΕΠΟΧΙΑΚΟ',
 '23 Ιουνίου (Παραμονή Ιωάννη)',
 'Ο Κλήδονας είναι ένα αρχαίο έθιμο μαντείας που γίνεται στη φωτιά της Αγιαννιώτικης νύχτας. Τα κορίτσια ρίχνουν τα αντικείμενά τους σε αγγείο με αμίλητο νερό.',
 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600', false, false),

(5, 'Πατινάδα Κέρκυρας', 'Serenata of Corfu', 'patinada-kerkyra', 8, 'ΚΟΙΝΩΝΙΚΟ',
 'Απόκριες (Κυρίαρχα)',
 'Η Πατινάδα είναι το κερκυραϊκό έθιμο της σερενάτας, βενετικής καταγωγής. Ομάδες ανδρών περπατούν στα σοκάκια της Κέρκυρας τραγουδώντας καντάδες κάτω από τα παράθυρα αγαπημένων.',
 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600', true, false),

(6, 'Ηπειρώτικος Γάμος', 'Epiriot Wedding', 'ipeirotikos-gamos', 3, 'ΓΑΜΗΛΙΟ',
 'Φθινόπωρο - Χειμώνας',
 'Ο παραδοσιακός ηπειρώτικος γάμος διαρκεί 3-5 μέρες και έχει αυστηρά τελετουργικά βήματα που κληρονομήθηκαν από τον Μεσαίωνα. Τα κλαρίνα κατέχουν κεντρική θέση σε κάθε τελετή.',
 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600', false, true);

-- ── DATA: EVENTS ──────────────────────────────────────────

insert into events (id, name, name_en, slug, type, date, location, description, image, website) values
(1, 'Καρναβάλι Πάτρας', 'Patras Carnival', 'karnavali-patras', 'ΦΕΣΤΙΒΑΛ',
 'Φεβρουάριος - Μάρτιος 2026', 'Πάτρα, Αχαΐα',
 'Το μεγαλύτερο καρναβάλι της Ελλάδας και ένα από τα μεγαλύτερα της Ευρώπης.',
 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600', 'https://www.carnivalpatras.gr'),

(2, 'Φεστιβάλ Παραδοσιακής Μουσικής Σερρών', 'Serres Traditional Music Festival', 'festival-serron', 'ΦΕΣΤΙΒΑΛ',
 'Ιούλιος 2026', 'Σέρρες, Μακεδονία',
 'Τριήμερο φεστιβάλ παραδοσιακής μουσικής και χορού από όλη την Ελλάδα.',
 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600', '#'),

(3, 'Αναστενάρια Αγίας Ελένης', 'Anastenaria of Agia Eleni', 'anastenaria-agia-eleni', 'ΕΚΠΑΙΔΕΥΤΙΚΟ',
 '21 Μαΐου 2026', 'Αγία Ελένη, Σέρρες',
 'Η αυθεντική τελετή Αναστεναρίων στο χωριό Αγία Ελένη.',
 'https://images.unsplash.com/photo-1504192010706-dd7f569ee2be?w=600', '#'),

(4, 'Φεστιβάλ Κρητικής Παράδοσης', 'Cretan Heritage Festival', 'festival-kritis', 'ΦΕΣΤΙΒΑΛ',
 'Αύγουστος 2026', 'Ηράκλειο, Κρήτη',
 'Παρουσίαση παραδοσιακών χορών, μουσικής και φορεσιών από όλη την Κρήτη.',
 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600', '#');
