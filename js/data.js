/*
 * ============================================================
 *  HELLAS HERITAGE — data.js
 *  ΕΔΩ βάζεις όλο σου το περιεχόμενο!
 *
 *  Πώς να προσθέσεις περιεχόμενο:
 *  1. Άνοιξε αυτό το αρχείο σε οποιοδήποτε text editor
 *  2. Αντέγραψε ένα υπάρχον entry (π.χ. ένα costume object)
 *  3. Άλλαξε τα πεδία με το νέο σου υλικό
 *  4. Αποθήκευσε και ανανέωσε τον browser
 *
 *  Για εικόνες: βάλε το URL της φωτογραφίας στο πεδίο "image"
 *  Μπορείς επίσης να βάλεις τοπικά αρχεία: "img/photo.jpg"
 * ============================================================
 */

const HH = {

  // ──────────────────────────────────────────────
  //  ΠΕΡΙΟΧΕΣ
  //  Πεδία: id, name, nameEn, type, description,
  //  descriptionEn, image, lat, lng, featured
  // ──────────────────────────────────────────────
  regions: [
    {
      id: 1,
      name: "Μακεδονία",
      nameEn: "Macedonia",
      type: "ηπειρος",
      slug: "makedonia",
      description: "Η Μακεδονία είναι η μεγαλύτερη γεωγραφική περιοχή της Ελλάδας με πλούσια πολιτιστική κληρονομιά, χαρακτηριστικές φορεσιές με έντονα κεντήματα και παραδόσεις που χρονολογούνται από την αρχαιότητα.",
      descriptionEn: "Macedonia is the largest geographical region of Greece with rich cultural heritage, characteristic costumes with vivid embroidery and traditions dating back to antiquity.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      lat: 40.6401,
      lng: 22.9444,
      costumesCount: 12,
      customsCount: 18,
      featured: true
    },
    {
      id: 2,
      name: "Θράκη",
      nameEn: "Thrace",
      type: "ηπειρος",
      slug: "thraki",
      description: "Η Θράκη αποτελεί σταυροδρόμι πολιτισμών. Τα έθιμά της, όπως το Αναστενάρια και το Δρομένο, είναι μοναδικά στον κόσμο και έχουν ενταχθεί στην άυλη πολιτιστική κληρονομιά της UNESCO.",
      descriptionEn: "Thrace is a crossroads of civilizations. Its customs, such as the Anastenaria fire-walking ritual and the Dromena, are unique worldwide and have been listed in UNESCO's intangible cultural heritage.",
      image: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=800",
      lat: 41.1496,
      lng: 25.4016,
      costumesCount: 8,
      customsCount: 22,
      featured: true
    },
    {
      id: 3,
      name: "Ήπειρος",
      nameEn: "Epirus",
      type: "ηπειρος",
      slug: "ipeiros",
      description: "Η Ήπειρος με τα απόκρημνα βουνά της και τα αρχαία Ζαγοροχώρια διατηρεί ζωντανές παραδόσεις αιώνων. Οι φορεσιές της με τα χρυσοκέντητα είναι από τις πιο εντυπωσιακές στην Ελλάδα.",
      descriptionEn: "Epirus with its rugged mountains and the ancient Zagori villages preserves centuries-old living traditions. Its gold-embroidered costumes are among the most impressive in Greece.",
      image: "https://images.unsplash.com/photo-1571863533956-01c88e79957e?w=800",
      lat: 39.6650,
      lng: 20.8536,
      costumesCount: 10,
      customsCount: 15,
      featured: true
    },
    {
      id: 4,
      name: "Πελοπόννησος",
      nameEn: "Peloponnese",
      type: "ηπειρος",
      slug: "peloponisos",
      description: "Η Πελοπόννησος, γη ηρώων και μυστηρίων, αποτελεί την καρδιά της αρχαίας ελληνικής ιστορίας. Οι παραδόσεις της Μάνης, της Αρκαδίας και της Κορίνθου διαφέρουν σημαντικά μεταξύ τους.",
      descriptionEn: "The Peloponnese, land of heroes and mysteries, is the heart of ancient Greek history. The traditions of Mani, Arcadia and Corinth differ significantly from each other.",
      image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800",
      lat: 37.5079,
      lng: 22.3731,
      costumesCount: 9,
      customsCount: 14,
      featured: false
    },
    {
      id: 5,
      name: "Κρήτη",
      nameEn: "Crete",
      type: "νησι",
      slug: "kriti",
      description: "Η Κρήτη έχει τη δική της ξεχωριστή κουλτούρα και ταυτότητα. Η κρητική φορεσιά — ιδιαίτερα η ανδρική με τις βράκες — είναι αναγνωρίσιμη σε όλο τον κόσμο ως σύμβολο της κρητικής υπερηφάνειας.",
      descriptionEn: "Crete has its own distinct culture and identity. The Cretan costume — especially the men's vraka breeches — is recognized worldwide as a symbol of Cretan pride.",
      image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800",
      lat: 35.2401,
      lng: 24.8093,
      costumesCount: 14,
      customsCount: 25,
      featured: true
    },
    {
      id: 6,
      name: "Κυκλάδες",
      nameEn: "Cyclades",
      type: "νησι",
      slug: "kyklades",
      description: "Τα νησιά των Κυκλάδων με τη χαρακτηριστική τους λευκή αρχιτεκτονική κρύβουν πλούσιες παραδόσεις. Κάθε νησί — Μύκονος, Σαντορίνη, Νάξος, Πάρος — έχει τη δική του ξεχωριστή κουλτούρα.",
      descriptionEn: "The Cycladic islands with their characteristic white architecture hide rich traditions. Each island — Mykonos, Santorini, Naxos, Paros — has its own distinct culture.",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800",
      lat: 37.1543,
      lng: 25.2686,
      costumesCount: 11,
      customsCount: 16,
      featured: false
    },
    {
      id: 7,
      name: "Δωδεκάνησα",
      nameEn: "Dodecanese",
      type: "νησι",
      slug: "dodekanisa",
      description: "Τα Δωδεκάνησα, λόγω της πολυτάραχης ιστορίας τους με βυζαντινές, ιπποτικές και οθωμανικές επιρροές, έχουν αναπτύξει μοναδικές παραδόσεις. Η Ρόδος και η Κως διαθέτουν εξαιρετικές φορεσιές.",
      descriptionEn: "The Dodecanese, due to their turbulent history with Byzantine, Crusader and Ottoman influences, have developed unique traditions. Rhodes and Kos feature exceptional costumes.",
      image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800",
      lat: 36.4341,
      lng: 28.2176,
      costumesCount: 7,
      customsCount: 12,
      featured: false
    },
    {
      id: 8,
      name: "Ιόνια Νησιά",
      nameEn: "Ionian Islands",
      type: "νησι",
      slug: "ionia-nisia",
      description: "Τα Επτάνησα με τη βενετική επίδραση έχουν ανεπτύξει μια μοναδική ελληνική κουλτούρα. Η μουσική, οι χοροί και οι φορεσιές της Κέρκυρας, της Κεφαλονιάς και της Ζακύνθου είναι αξεπέραστα.",
      descriptionEn: "The Ionian Islands with Venetian influence have developed a unique Greek culture. The music, dances and costumes of Corfu, Kefalonia and Zakynthos are unparalleled.",
      image: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=800",
      lat: 38.1747,
      lng: 20.4907,
      costumesCount: 8,
      customsCount: 13,
      featured: false
    }
  ],

  // ──────────────────────────────────────────────
  //  ΦΟΡΕΣΙΕΣ
  //  Πεδία: id, name, nameEn, regionId, gender,
  //  period, occasion, materials, colors,
  //  description, symbolism, image, gallery[],
  //  isPremium, featured
  // ──────────────────────────────────────────────
  costumes: [
    {
      id: 1,
      name: "Φορεσιά Αμαλία",
      nameEn: "Amalia Dress",
      slug: "foresia-amalia",
      regionId: 1,
      gender: "ΓΥΝΑΙΚΕΙΑ",
      period: "1836 - σήμερα",
      occasion: "Επίσημες εθνικές εορτές, γάμοι, παρελάσεις",
      materials: ["μετάξι", "βελούδο", "χρυσονήματα", "δαντέλα"],
      colors: ["κόκκινο", "μπλε", "χρυσό"],
      description: "Η φορεσιά Αμαλία πήρε το όνομά της από την πρώτη βασίλισσα της σύγχρονης Ελλάδας, Αμαλία του Όλντενμπουργκ. Εισήχθη ως η επίσημη ελληνική εθνική φορεσιά για γυναίκες κατά τον 19ο αιώνα.",
      symbolism: "Τα χρώματά της αντικατοπτρίζουν τη βυζαντινή παράδοση και την ελληνική εθνική ταυτότητα. Το κόκκινο συμβολίζει τη δύναμη, το μπλε τη θάλασσα και τον ουρανό, το χρυσό την ευημερία.",
      image: "https://images.unsplash.com/photo-1594387303756-0c25e8f7b97a?w=600",
      gallery: [],
      isPremium: false,
      featured: true
    },
    {
      id: 2,
      name: "Κρητική Βράκα (Ανδρική)",
      nameEn: "Cretan Vraka",
      slug: "kritiki-vraka",
      regionId: 5,
      gender: "ΑΝΔΡΙΚΗ",
      period: "17ος αιώνας - σήμερα",
      occasion: "Καθημερινή χρήση στην Κρήτη, εορτές, πανηγύρια",
      materials: ["μαύρο ύφασμα (σέρτζι)", "ύφασμα βελούδο", "δέρμα (μπότες)"],
      colors: ["μαύρο", "λευκό"],
      description: "Η κρητική ανδρική φορεσιά με τη χαρακτηριστική βράκα (πλατύ παντελόνι) και τη μαύρη κρητική μαντίλα είναι ένα από τα πιο αναγνωρίσιμα σύμβολα της Κρήτης. Φοριέται ακόμα και σήμερα σε γιορτές.",
      symbolism: "Το μαύρο χρώμα αντιπροσωπεύει το πένθος για την τελευταία κρητική επανάσταση και την ορκωμοσία ελευθερίας. Η βράκα επιτρέπει ελευθερία κινήσεων — σύμβολο του ανήσυχου κρητικού χαρακτήρα.",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600",
      gallery: [],
      isPremium: false,
      featured: true
    },
    {
      id: 3,
      name: "Σαρακατσάνα Φορεσιά",
      nameEn: "Sarakatsani Costume",
      slug: "sarakatsana",
      regionId: 1,
      gender: "ΓΥΝΑΙΚΕΙΑ",
      period: "18ος - 20ός αιώνας",
      occasion: "Γάμοι, πανηγύρια Σαρακατσάνων",
      materials: ["μαλλί", "βαμβάκι", "ασημένια κοσμήματα"],
      colors: ["άσπρο", "μαύρο", "κόκκινο"],
      description: "Οι Σαρακατσάνοι ήταν νομαδικοί κτηνοτρόφοι της βόρειας Ελλάδας. Η φορεσιά τους χαρακτηρίζεται από πλούσια χρωματιστά κεντήματα πάνω σε λευκό ή μαύρο βάθος, δείγμα της αριστοτεχνικής δουλειάς των γυναικών τους.",
      symbolism: "Κάθε μοτίβο στα κεντήματα έχει συγκεκριμένο νόημα: ο ήλιος για ζωή, το δέντρο για γονιμότητα, τα ζώα για ευδαιμονία.",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600",
      gallery: [],
      isPremium: true,
      featured: true
    },
    {
      id: 4,
      name: "Θρακιώτικη Φορεσιά",
      nameEn: "Thracian Costume",
      slug: "thrakiotiki",
      regionId: 2,
      gender: "ΓΥΝΑΙΚΕΙΑ",
      period: "19ος αιώνας",
      occasion: "Γάμοι, θρησκευτικές εορτές",
      materials: ["μετάξι", "χρυσοκλωστή", "ασήμι"],
      colors: ["σκούρο κόκκινο", "πράσινο", "χρυσό", "μαύρο"],
      description: "Η θρακιώτικη γυναικεία φορεσιά είναι γνωστή για τα εξαιρετικά πολύχρωμα κεντήματα και τα πολλαπλά στρώματα. Διαφέρει σημαντικά ανά υποπεριοχή — από τον Έβρο μέχρι την Ξάνθη.",
      symbolism: "Τα γεωμετρικά μοτίβα αντικατοπτρίζουν αρχαία σύμβολα γονιμότητας και προστασίας. Τα κόσμιη ασήμι υποδηλώνουν κοινωνική θέση.",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600",
      gallery: [],
      isPremium: true,
      featured: false
    },
    {
      id: 5,
      name: "Ηπειρώτικη Φορεσιά",
      nameEn: "Epiriot Costume",
      slug: "ipeirotiki",
      regionId: 3,
      gender: "ΓΥΝΑΙΚΕΙΑ",
      period: "18ος - 19ος αιώνας",
      occasion: "Γάμοι, Απόκριες, πανηγύρια",
      materials: ["μαλλί", "μετάξι", "χρυσονήματα", "ασημένιες ζώνες"],
      colors: ["σκούρο μπλε", "μαύρο", "χρυσό"],
      description: "Η ηπειρώτικη φορεσιά ξεχωρίζει για τις εντυπωσιακές χρυσόκλωστες ζώνες και τα πλούσια κεντήματα. Τα Ζαγοροχώρια, η Κόνιτσα και τα Γιάννενα έχουν ελαφρά διαφορετικές παραλλαγές.",
      symbolism: "Η ασημένια ζώνη αντικατοπτρίζει την οικονομική κατάσταση της οικογένειας. Τα χρυσοκέντητα λουλούδια συμβολίζουν ευδαιμονία και γονιμότητα.",
      image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600",
      gallery: [],
      isPremium: false,
      featured: false
    },
    {
      id: 6,
      name: "Τσολιάς (Εύζωνας)",
      nameEn: "Tsolias (Evzone)",
      slug: "tsolias-evzonas",
      regionId: 1,
      gender: "ΑΝΔΡΙΚΗ",
      period: "18ος αιώνας - σήμερα",
      occasion: "Εθνικές εορτές, παρελάσεις, Αλλαγή Φρουράς",
      materials: ["λευκό λινό (φουστανέλα)", "κόκκινο βελούδο", "δέρμα"],
      colors: ["λευκό", "κόκκινο", "μπλε"],
      description: "Η φορεσιά του Τσολιά (Εύζωνα) με τη φουστανέλα των 400 πτυχών είναι το πιο διεθνώς αναγνωρισμένο ελληνικό σύμβολο. Κάθε πτυχή της φουστανέλας αντιπροσωπεύει ένα χρόνο τουρκοκρατίας.",
      symbolism: "Οι 400 πτυχές = 400 χρόνια Οθωμανικής κατοχής. Η κόκκινη τζακέτα (φερεντζές) συμβολίζει το αίμα των αγωνιστών. Τα τσαρούχια με τις μεγάλες φούντες επιτρέπουν αθόρυβη βάδιση.",
      image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=600",
      gallery: [],
      isPremium: false,
      featured: true
    },
    {
      id: 7,
      name: "Κυκλαδίτικη Φορεσιά",
      nameEn: "Cycladic Costume",
      slug: "kykladitiki",
      regionId: 6,
      gender: "ΓΥΝΑΙΚΕΙΑ",
      period: "17ος - 19ος αιώνας",
      occasion: "Γάμοι, θρησκευτικές γιορτές",
      materials: ["μετάξι", "χρυσοκλωστή", "δαντέλα"],
      colors: ["λευκό", "χρυσό", "γαλάζιο"],
      description: "Η κυκλαδίτικη φορεσιά διαφέρει από νησί σε νησί, αλλά μοιράζεται κοινά χαρακτηριστικά: λευκά και χρυσά χρώματα, λεπτά υφάσματα και εκλεπτυσμένα κεντήματα που αντικατοπτρίζουν τον πλούτο των νησιωτών εμπόρων.",
      symbolism: "Το λευκό χρώμα αντιπροσωπεύει την αγνότητα και τη θάλασσα. Τα γαλάζια στολίδια παραπέμπουν στο αιγαίο.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
      gallery: [],
      isPremium: true,
      featured: false
    },
    {
      id: 8,
      name: "Μακεδόνικη Ανδρική Φορεσιά",
      nameEn: "Macedonian Male Costume",
      slug: "makedoniki-andrika",
      regionId: 1,
      gender: "ΑΝΔΡΙΚΗ",
      period: "18ος - 19ος αιώνας",
      occasion: "Γάμοι, πανηγύρια, εθνικές εορτές",
      materials: ["μαύρο ύφασμα", "ασήμι", "χρυσονήματα"],
      colors: ["μαύρο", "λευκό", "ασημί"],
      description: "Η βόρεια μακεδόνικη ανδρική φορεσιά χαρακτηρίζεται από τον μαύρο γκλαμπούρ (κοντό παλτό) με πλούσια ασημένια κεντήματα και τα τσαρούχια. Διαφέρει αρκετά από την κεντρική και νότια Μακεδονία.",
      symbolism: "Τα ασημένια κεντήματα στον γκλαμπούρ δείχνουν την κοινωνική θέση του άνδρα. Ο αριθμός των ασημένιων κουμπιών υποδηλώνει πλούτο και κύρος.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600",
      gallery: [],
      isPremium: true,
      featured: false
    }
  ],

  // ──────────────────────────────────────────────
  //  ΕΘΙΜΑ
  //  Πεδία: id, name, nameEn, regionId, category,
  //  periodOfYear, description, steps[], image,
  //  isPremium, featured
  // ──────────────────────────────────────────────
  customs: [
    {
      id: 1,
      name: "Αναστενάρια",
      nameEn: "Anastenaria Fire-Walking",
      slug: "anastenaria",
      regionId: 2,
      category: "ΘΡΗΣΚΕΥΤΙΚΟ",
      periodOfYear: "21 Μαΐου (Αγίου Κωνσταντίνου)",
      description: "Τα Αναστενάρια είναι ένα από τα πιο εντυπωσιακά και μυστηριακά έθιμα της Ελλάδας. Οι Αναστενάρηδες περπατούν ξυπόλητοι σε αναμμένα κάρβουνα κρατώντας εικόνες των Αγίων Κωνσταντίνου και Ελένης.",
      steps: [
        { title: "Προετοιμασία", description: "Οι Αναστενάρηδες νηστεύουν και προσεύχονται για ημέρες" },
        { title: "Μουσική & Ρυθμός", description: "Αρχίζει η παραδοσιακή μουσική με λύρα και τύμπανα" },
        { title: "Έκσταση", description: "Οι πιστοί εισέρχονται σε κατάσταση έκστασης (κατάληψη)" },
        { title: "Βάδισμα στη φωτιά", description: "Περπατούν στα αναμμένα κάρβουνα για 2-3 λεπτά" }
      ],
      image: "https://images.unsplash.com/photo-1504192010706-dd7f569ee2be?w=600",
      isPremium: false,
      featured: true
    },
    {
      id: 2,
      name: "Κρητικός Γάμος",
      nameEn: "Cretan Wedding",
      slug: "kritikos-gamos",
      regionId: 5,
      category: "ΓΑΜΗΛΙΟ",
      periodOfYear: "Κυρίως καλοκαίρι",
      description: "Ο κρητικός γάμος είναι ένα πολυήμερο γεγονός που ξεκινά από Παρασκευή και τελειώνει Κυριακή. Χαρακτηρίζεται από λυράρηδες, ριζίτικα τραγούδια και το έθιμο της βράκας για τον γαμπρό.",
      steps: [
        { title: "Παρασκευή: Πρόσκληση", description: "Ο γαμπρός επισκέπτεται τα σπίτια με ντέφι και ανακοινώνει το γάμο" },
        { title: "Σάββατο: Στολισμός νύφης", description: "Γυναίκες φίλες στολίζουν τη νύφη με κεντητές φορεσιές" },
        { title: "Σάββατο: Ντύσιμο γαμπρού", description: "Ο γαμπρός ντύνεται τη βράκα με τελετουργικό τρόπο" },
        { title: "Κυριακή: Εκκλησία & Χορός", description: "Τελετή ακολουθεί πολυήμερος χορός και τραπέζι" }
      ],
      image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600",
      isPremium: false,
      featured: true
    },
    {
      id: 3,
      name: "Μαμλαρόι (Καρναβάλι Νάουσας)",
      nameEn: "Mamlaro (Naoussa Carnival)",
      slug: "mamlaroi-naousa",
      regionId: 1,
      category: "ΕΠΟΧΙΑΚΟ",
      periodOfYear: "Αποκριές (Φεβρουάριος - Μάρτιος)",
      description: "Το Καρναβάλι της Νάουσας είναι ένα από τα παλαιότερα και εντυπωσιακότερα της Ελλάδας. Οι Γενίτσαροι και οι Μπούλες με τις παραδοσιακές τους στολές χορεύουν στους δρόμους της πόλης.",
      steps: [
        { title: "Κατασκευή στολών", description: "Εβδομάδες πριν οι κάτοικοι ετοιμάζουν χειροποίητες στολές" },
        { title: "Πρώτη Κυριακή Αποκριών", description: "Παρέλαση και χοροί στην κεντρική πλατεία" },
        { title: "Καθαρή Δευτέρα", description: "Αποχαιρετισμός με τελευταίο χορό και κάψιμο σε μπανιέρα" }
      ],
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600",
      isPremium: true,
      featured: true
    },
    {
      id: 4,
      name: "Κλήδονας",
      nameEn: "Klidonas",
      slug: "klidonas",
      regionId: 6,
      category: "ΕΠΟΧΙΑΚΟ",
      periodOfYear: "23 Ιουνίου (Παραμονή Ιωάννη)",
      description: "Ο Κλήδονας είναι ένα αρχαίο έθιμο μαντείας που γίνεται στη φωτιά της Αγιαννιώτικης νύχτας. Τα κορίτσια ρίχνουν τα αντικείμενά τους σε αγγείο με 'αμίλητο νερό' και αναζητούν τον μελλοντικό σύζυγο.",
      steps: [
        { title: "Συλλογή αμίλητου νερού", description: "Νεαρή γυναίκα παίρνει νερό από πηγή χωρίς να μιλήσει" },
        { title: "Ρίψη αντικειμένων", description: "Τα κορίτσια ρίχνουν κοσμήματα και αντικείμενα στο αγγείο" },
        { title: "Ολονυκτία", description: "Το αγγείο μένει κλειστό όλη τη νύχτα κάτω από τα αστέρια" },
        { title: "Αποκάλυψη", description: "Παιδί τραβά τυχαία αντικείμενα ενώ ψάλλουν προφητικά τραγούδια" }
      ],
      image: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600",
      isPremium: false,
      featured: false
    },
    {
      id: 5,
      name: "Πατινάδα Κέρκυρας",
      nameEn: "Serenata of Corfu",
      slug: "patinada-kerkyra",
      regionId: 8,
      category: "ΚΟΙΝΩΝΙΚΟ",
      periodOfYear: "Απόκριες (Κυρίαρχα)",
      description: "Η Πατινάδα είναι το κερκυραϊκό έθιμο της σερενάτας, βενετικής καταγωγής. Ομάδες ανδρών περπατούν στα σοκάκια της Κέρκυρας τραγουδώντας καντάδες κάτω από τα παράθυρα αγαπημένων.",
      steps: [
        { title: "Συγκρότηση ομάδας", description: "5-10 άνδρες με μαντολίνα, κιθάρα και φωνές" },
        { title: "Βόλτα στην παλιά πόλη", description: "Βαδίζουν στα πέτρινα σοκάκια της πόλης" },
        { title: "Σερενάτα", description: "Σταματούν κάτω από παράθυρο και τραγουδούν αρέσκεια" }
      ],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
      isPremium: true,
      featured: false
    },
    {
      id: 6,
      name: "Ηπειρώτικος Γάμος",
      nameEn: "Epiriot Wedding",
      slug: "ipeirotikos-gamos",
      regionId: 3,
      category: "ΓΑΜΗΛΙΟ",
      periodOfYear: "Φθινόπωρο - Χειμώνας",
      description: "Ο παραδοσιακός ηπειρώτικος γάμος διαρκεί 3-5 μέρες και έχει αυστηρά τελετουργικά βήματα που κληρονομήθηκαν από τον Μεσαίωνα. Τα κλαρίνα κατέχουν κεντρική θέση σε κάθε τελετή.",
      steps: [
        { title: "Πέμπτη: Πλύσιμο ρούχων", description: "Γυναίκες πλένουν τελετουργικά τα ρούχα της νύφης" },
        { title: "Παρασκευή: Προζύμι", description: "Ζυμώνεται το τελετουργικό ψωμί του γάμου" },
        { title: "Σάββατο: Στολισμός", description: "Νύφη και γαμπρός στολίζονται με παραδοσιακές φορεσιές" },
        { title: "Κυριακή: Εκκλησία", description: "Γαμήλια τελετή ακολουθείται από 3ήμερο γλέντι" }
      ],
      image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600",
      isPremium: false,
      featured: true
    }
  ],

  // ──────────────────────────────────────────────
  //  ΕΚΔΗΛΩΣΕΙΣ
  // ──────────────────────────────────────────────
  events: [
    {
      id: 1,
      name: "Καρναβάλι Πάτρας",
      nameEn: "Patras Carnival",
      slug: "karnavali-patras",
      type: "ΦΕΣΤΙΒΑΛ",
      date: "Φεβρουάριος - Μάρτιος 2026",
      location: "Πάτρα, Αχαΐα",
      description: "Το μεγαλύτερο καρναβάλι της Ελλάδας και ένα από τα μεγαλύτερα της Ευρώπης.",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600",
      website: "https://www.carnivalpatras.gr"
    },
    {
      id: 2,
      name: "Φεστιβάλ Παραδοσιακής Μουσικής Σερρών",
      nameEn: "Serres Traditional Music Festival",
      slug: "festival-serron",
      type: "ΦΕΣΤΙΒΑΛ",
      date: "Ιούλιος 2026",
      location: "Σέρρες, Μακεδονία",
      description: "Τριήμερο φεστιβάλ παραδοσιακής μουσικής και χορού από όλη την Ελλάδα.",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600",
      website: "#"
    },
    {
      id: 3,
      name: "Αναστενάρια Αγίας Ελένης",
      nameEn: "Anastenaria of Agia Eleni",
      slug: "anastenaria-agia-eleni",
      type: "ΕΚΠΑΙΔΕΥΤΙΚΟ",
      date: "21 Μαΐου 2026",
      location: "Αγία Ελένη, Σέρρες",
      description: "Η αυθεντική τελετή Αναστεναρίων στο χωριό Αγία Ελένη.",
      image: "https://images.unsplash.com/photo-1504192010706-dd7f569ee2be?w=600",
      website: "#"
    },
    {
      id: 4,
      name: "Φεστιβάλ Κρητικής Παράδοσης",
      nameEn: "Cretan Heritage Festival",
      slug: "festival-kritis",
      type: "ΦΕΣΤΙΒΑΛ",
      date: "Αύγουστος 2026",
      location: "Ηράκλειο, Κρήτη",
      description: "Παρουσίαση παραδοσιακών χορών, μουσικής και φορεσιών απ' όλη την Κρήτη.",
      image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600",
      website: "#"
    }
  ],

  // ──────────────────────────────────────────────
  //  ΡΥΘΜΙΣΕΙΣ SITE
  // ──────────────────────────────────────────────
  settings: {
    siteName: "Hellas Heritage",
    tagline: "Ανακάλυψε την Ψυχή της Ελλάδας",
    taglineEn: "Discover the Soul of Greece",
    heroTitle: "Η Ελλάδα Ζωντανεύει",
    heroSubtitle: "Φορεσιές, έθιμα και παραδόσεις από κάθε γωνιά της ελληνικής γης",
    email: "info@hellasheritage.gr",
    social: {
      instagram: "#",
      facebook: "#",
      youtube: "#"
    }
  }
};
