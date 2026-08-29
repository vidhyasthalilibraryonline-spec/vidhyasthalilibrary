/* ============================================================
   VIDHYASTHALI LIBRARY — BILINGUAL (HINDI / ENGLISH) SYSTEM
   Instant full-site language toggle with localStorage persistence
   ============================================================ */

var translations = {
  hi: {
    // Navigation
    nav_home: "होम",
    nav_study_space: "स्टडी स्पेस",
    nav_pyq: "पुराने पेपर (PYQ)",
    nav_ncert: "एनसीईआरटी (6–12)",
    nav_books: "मुफ़्त पुस्तकें",
    nav_about: "हमारे बारे में",
    nav_contact: "संपर्क करें",
    nav_location: "संकल्प क्लासेज के पास, लक्ष्मीनगर, बाड़मेर",
    lang_btn: "English",

    // Hero Section
    hero_tagline: "एक कदम सफलता की ओर... · लक्ष्मीनगर, बाड़मेर",
    hero_title: "जहाँ शांति बनाती है सफलता की राह।",
    hero_desc: "बाड़मेर का वातानुकूलित (AC) स्व-अध्ययन केंद्र। 32+ निजी डेस्क क्यूबिकल, हाई-स्पीड वाईफाई, आरओ शीतल जल, 24 घंटे पावर बैकअप और शांत वातावरण — प्रतियोगी परीक्षाओं (REET, RAS, CET, SSC, UPSC) की तैयारी करने वाले विद्यार्थियों के लिए। साथ ही पढ़ने के लिए 100% मुफ़्त डिजिटल पुस्तकें व पेपर।",
    hero_btn_book: "अपनी सीट बुक करें",
    hero_btn_books: "मुफ़्त पुस्तकें पढ़ें",
    stat_desks: "32+ डेस्क",
    stat_desks_label: "अध्ययन सीटें",
    stat_ac: "100% एसी",
    stat_ac_label: "वातानुकूलित हॉल",
    stat_cctv: "24/7 सुरक्षा",
    stat_cctv_label: "सीसीटीवी व वाईफाई",

    // Study Space Section
    study_badge: "गंभीर विद्यार्थियों के लिए विशेष स्थान",
    study_title: "पूर्ण शांति और अध्ययन का सर्वश्रेष्ठ माहौल",
    study_desc: "घर पर पढ़ाई में व्यवधान? यहाँ आपको मिलता है बिना किसी शोर का समर्पित अध्ययन डेस्क।",
    feat_ac_title: "पूर्ण वातानुकूलित (AC) हॉल",
    feat_ac_desc: "बाड़मेर की गर्मी में भी शांत और शीतल वातावरण ताकि आप बिना थके लगातार पढ़ सकें।",
    feat_wifi_title: "हाई-स्पीड 5G वाईफाई",
    feat_wifi_desc: "ऑनलाइन क्लासेज, वीडियो लेक्चर और पीडीएफ डाउनलोड के लिए बिना रुकावट इंटरनेट।",
    feat_power_title: "24 घंटे पावर बैकअप",
    feat_power_desc: "इनवर्टर और जनरेटर बैकअप — लाइट जाने पर भी आपकी पढ़ाई कभी नहीं रुकेगी।",
    feat_ro_title: "आरओ शीतल पेयजल",
    feat_ro_desc: "साफ और ठंडा आरओ का पानी हर समय उपलब्ध।",
    feat_desk_title: "व्यक्तिगत स्टडी क्यूबिकल",
    feat_desk_desc: "आरामदायक कुर्सी, व्यक्तिगत चार्जिंग सॉकेट और सेपरेट स्टडी लाइट।",
    feat_cctv_title: "सीसीटीवी निगरानी व शांति",
    feat_cctv_desc: "पूर्ण अनुशासन और शांत अध्ययन का सख्त नियम।",

    // Booking Card
    book_card_badge: "सीट आरक्षण",
    book_card_title: "अपनी समर्पित अध्ययन सीट बुक करें",
    book_card_desc: "सीटें सीमित हैं (कुल 32 डेस्क)। अपनी पसंद की शिफ्ट (सुबह / दोपहर / शाम / फुल डे) आरक्षित करने के लिए अभी कॉल करें या व्हाट्सएप करें।",
    book_card_call: "सीट बुक करने के लिए कॉल करें:",
    book_card_hours: "समय: प्रतिदिन प्रातः 6:00 बजे से रात्रि 11:00 बजे तक (रविवार सहित)",

    // Vault Spotlight on Homepage
    vault_spotlight_badge: "100% मुफ़्त एवं आधिकारिक सामग्री",
    vault_spotlight_title: "डिजिटल स्टडी वॉल्ट और परीक्षा पेपर",
    vault_spotlight_desc: "आरपीएससी आरएएस, रीट, सीईटी, यूपीएससी, एसएससी एवं एनसीईआरटी की आधिकारिक पुस्तकें बिना किसी शुल्क व लॉगिन के डाउनलोड करें।",
    cat_rpsc: "आरपीएससी एवं राजस्थान",
    cat_rpsc_sub: "आरएएस, रीट, सीईटी, एसआई, पटवार",
    cat_upsc: "यूपीएससी सिविल सेवा",
    cat_upsc_sub: "प्रारंभिक जीएस, सीसैट व मुख्य परीक्षा",
    cat_ncert: "एनसीईआरटी पुस्तकें (6–12)",
    cat_ncert_sub: "इतिहास, राजनीति, भूगोल, विज्ञान",
    cat_ssc: "कर्मचारी चयन आयोग (SSC)",
    cat_ssc_sub: "सीजीएल, सीएचएसएल, जीडी, सीपीओ",
    cat_neet: "नीट एवं जेईई मेन",
    cat_neet_sub: "एनटीए आधिकारिक पेपर व उत्तर कुंजी",
    cat_all: "संपूर्ण सामग्री देखें",
    cat_all_sub: "सभी 35+ पेपर व पुस्तकें देखें",

    // Featured Books
    picks_badge: "विशेष चयन",
    picks_title: "हमारे लोकप्रिय हिंदी व अंग्रेजी क्लासिक्स",
    picks_desc: "मुंशी प्रेमचंद, कबीर, पंचतंत्र और विश्व साहित्य के अनमोल ग्रंथ।",
    view_all_books: "सभी पुस्तकें देखें",

    // Study Vault Page (browse.html)
    vault_page_badge: "आधिकारिक परीक्षा प्रश्न-पत्र एवं एनसीईआरटी वॉल्ट",
    vault_page_title: "डिजिटल स्टडी वॉल्ट",
    vault_page_desc: "100% आधिकारिक पुराने प्रश्न-पत्र, विस्तृत पाठ्यक्रम, कक्षा 6 से 12 एनसीईआरटी पुस्तकें और कालजयी साहित्य। बाड़मेर और सम्पूर्ण भारत के विद्यार्थियों के लिए पूर्णतः निःशुल्क।",
    tab_all: "सभी सामग्री",
    tab_rpsc: "आरपीएससी व राजस्थान (RAS/REET)",
    tab_upsc: "यूपीएससी सिविल सेवा",
    tab_ncert: "एनसीईआरटी कक्षा 6–12",
    tab_ssc: "एसएससी परीक्षाएं",
    tab_neet: "नीट एवं जेईई",
    tab_banking: "बैंकिंग परीक्षाएं",
    tab_lit: "क्लासिक पुस्तकें",
    pill_all_types: "सभी प्रकार",
    pill_pyq: "पुराने प्रश्न-पत्र (PYQ)",
    pill_syllabus: "आधिकारिक पाठ्यक्रम",
    pill_textbook: "एनसीईआरटी पुस्तकें",
    pill_literature: "साहित्य",
    search_placeholder: "परीक्षा, विषय, कक्षा, वर्ष या पुस्तक का नाम खोजें...",

    // Footer
    footer_tagline: "विद्यास्थली लाइब्रेरी — लक्ष्मीनगर, बाड़मेर में विद्यार्थियों के लिए समर्पित वातानुकूलित स्व-अध्ययन केंद्र एवं मुफ़्त डिजिटल लाइब्रेरी।",
    footer_pages: "मुख्य पृष्ठ",
    footer_reach: "संपर्क विवरण",
    footer_rights: "© 2026 विद्यास्थली लाइब्रेरी, बाड़मेर। सर्वाधिकार सुरक्षित।"
  },
  en: {
    // Navigation
    nav_home: "Home",
    nav_study_space: "Study Space",
    nav_pyq: "PYQ Papers",
    nav_ncert: "NCERT (6–12)",
    nav_books: "Free Books",
    nav_about: "About",
    nav_contact: "Contact",
    nav_location: "Near Sankalp Classes, Laxmi Nagar, Barmer",
    lang_btn: "हिन्दी",

    // Hero Section
    hero_tagline: "Where Silence Meets Success. · Laxmi Nagar, Barmer",
    hero_title: "Where Silence Meets Success.",
    hero_desc: "Barmer's premier air-conditioned self-study reading hall. 32 private desk cubicles, high-speed WiFi, RO cold water, 24/7 power backup, and complete quiet — built for serious competitive exam aspirants (REET, RAS, CET, SSC, UPSC). Plus 100% free digital books and official papers.",
    hero_btn_book: "Book Your Seat",
    hero_btn_books: "Read Free Books",
    stat_desks: "32+ Desks",
    stat_desks_label: "Study Cubicles",
    stat_ac: "100% AC",
    stat_ac_label: "Air Conditioned",
    stat_cctv: "24/7 Safe",
    stat_cctv_label: "CCTV & WiFi",

    // Study Space Section
    study_badge: "Built for Serious Aspirants",
    study_title: "Complete Quiet & the Ideal Study Environment",
    study_desc: "Distractions at home? Here you get a dedicated, noise-free personal study desk.",
    feat_ac_title: "Full Air Conditioning",
    feat_ac_desc: "Stay cool and focused in Barmer's summer heat with uninterrupted climate control.",
    feat_wifi_title: "High-Speed 5G WiFi",
    feat_wifi_desc: "Fast, reliable internet for online video lectures and downloading study materials.",
    feat_power_title: "24/7 Power Backup",
    feat_power_desc: "Inverter and generator backup ensures your study routine is never interrupted.",
    feat_ro_title: "Chilled RO Drinking Water",
    feat_ro_desc: "Clean, fresh, and cold RO water available throughout the day.",
    feat_desk_title: "Personal Study Cubicles",
    feat_desk_desc: "Ergonomic chairs, dedicated charging points, and private desk partitions.",
    feat_cctv_title: "CCTV Security & Silence",
    feat_cctv_desc: "Strict silence policy and 24/7 surveillance for safety and focus.",

    // Booking Card
    book_card_badge: "Seat Reservation",
    book_card_title: "Book Your Dedicated Study Desk",
    book_card_desc: "Seats are limited (32 desks total). Call or WhatsApp now to reserve your preferred study slot (Morning / Afternoon / Evening / Full Day).",
    book_card_call: "Call to reserve your desk:",
    book_card_hours: "Open Daily: 6:00 AM — 11:00 PM (Including Sundays)",

    // Vault Spotlight on Homepage
    vault_spotlight_badge: "100% Free & Official Releases",
    vault_spotlight_title: "Explore the Digital Study Vault",
    vault_spotlight_desc: "Download official question papers, syllabi, and NCERT foundation textbooks with zero fees and no login required.",
    cat_rpsc: "RPSC & Rajasthan",
    cat_rpsc_sub: "RAS, REET, CET, SI, Patwar PYQs",
    cat_upsc: "UPSC Civil Services",
    cat_upsc_sub: "Prelims GS, CSAT & Mains Papers",
    cat_ncert: "NCERT Textbooks (6–12)",
    cat_ncert_sub: "History, Polity, Geography & Science",
    cat_ssc: "Staff Selection (SSC)",
    cat_ssc_sub: "CGL, CHSL, GD & CPO Papers",
    cat_neet: "NEET & JEE Main",
    cat_neet_sub: "Official NTA Papers & Answer Keys",
    cat_all: "View All Materials",
    cat_all_sub: "Browse complete 35+ papers & books",

    // Featured Books
    picks_badge: "Staff Picks",
    picks_title: "Books We Keep Coming Back To",
    picks_desc: "Hand-picked classics by Munshi Premchand, Kabir, Panchatantra, and world literature.",
    view_all_books: "View all books",

    // Study Vault Page (browse.html)
    vault_page_badge: "Official Exam Papers & NCERT Vault",
    vault_page_title: "Digital Study Vault",
    vault_page_desc: "100% legal official previous papers, official syllabi, NCERT foundation books (Classes 6–12), and classic literature. Free for every student in Barmer and beyond.",
    tab_all: "All Materials",
    tab_rpsc: "RPSC & Rajasthan (RAS/REET)",
    tab_upsc: "UPSC Civil Services",
    tab_ncert: "NCERT Classes 6–12",
    tab_ssc: "SSC Exams",
    tab_neet: "NEET & JEE",
    tab_banking: "Banking",
    tab_lit: "Classic Books",
    pill_all_types: "All Types",
    pill_pyq: "Question Papers (PYQ)",
    pill_syllabus: "Official Syllabus",
    pill_textbook: "NCERT Books",
    pill_literature: "Literature",
    search_placeholder: "Search by exam, subject, class, year or title...",

    // Footer
    footer_tagline: "Vidhyasthali Library — Air-conditioned self-study reading hall and free digital library for students in Laxmi Nagar, Barmer.",
    footer_pages: "Pages",
    footer_reach: "Reach Us",
    footer_rights: "© 2026 Vidhyasthali Library, Barmer. All rights reserved."
  }
};

// Safe storage access helper for file:// and iframe security environments
function getStoredLang() {
  try {
    return localStorage.getItem('vidhyasthali_lang') || 'en';
  } catch (e) {
    return 'en';
  }
}

function setStoredLang(lang) {
  try {
    localStorage.setItem('vidhyasthali_lang', lang);
  } catch (e) {
    // ignore
  }
}

// Current language state (English by default)
var currentLang = getStoredLang();

function applyLanguage(lang) {
  currentLang = lang;
  setStoredLang(lang);
  var dict = translations[lang] || translations.en;

  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Update placeholder attributes
  document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
    var key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.placeholder = dict[key];
    }
  });

  // Update Language Toggle Button text
  var toggleBtns = document.querySelectorAll('.lang-toggle-btn');
  toggleBtns.forEach(function (btn) {
    btn.innerHTML = '🌐 ' + dict.lang_btn;
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
}

function toggleLanguage() {
  var nextLang = currentLang === 'hi' ? 'en' : 'hi';
  applyLanguage(nextLang);
}

document.addEventListener('DOMContentLoaded', function () {
  // Apply stored or default language on initial load
  applyLanguage(currentLang);

  // Bind click handlers to language toggle buttons
  document.querySelectorAll('.lang-toggle-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      toggleLanguage();
    });
  });
});

