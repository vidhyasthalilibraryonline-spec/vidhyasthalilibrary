/* ============================================
   VIDHYASTHALI LIBRARY — DIGITAL STUDY VAULT
   High-performance filtering, search & counts for
   Official Exam Papers, NCERT & Literature
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  var vaultGrid = document.getElementById('vaultGrid');
  var categoryTabs = document.querySelectorAll('.vault-tab');
  var typePills = document.querySelectorAll('.vault-pill');
  var searchInput = document.getElementById('searchInput');

  var ncertSliderWrapper = document.getElementById('ncertSliderWrapper');
  var ncertTrack = document.getElementById('ncertSliderTrack');
  var ncertChips = document.querySelectorAll('.ncert-class-chip');
  var btnLeft = document.getElementById('sliderBtnLeft');
  var btnRight = document.getElementById('sliderBtnRight');

  var allItems = [];
  var activeCategory = 'all';
  var activeType = 'all';
  var activeNcertClass = 'all';
  var searchKeyword = '';

  // Slider horizontal navigation
  if (btnLeft && ncertTrack) {
    btnLeft.addEventListener('click', function () {
      ncertTrack.scrollBy({ left: -200, behavior: 'smooth' });
    });
  }
  if (btnRight && ncertTrack) {
    btnRight.addEventListener('click', function () {
      ncertTrack.scrollBy({ left: 200, behavior: 'smooth' });
    });
  }

  // NCERT class chip selection
  ncertChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      activeNcertClass = this.dataset.class;
      ncertChips.forEach(function (c) { c.classList.remove('active'); });
      this.classList.add('active');
      renderVault();
    });
  });

  // Load vault data from JS memory or JSON
  function processVaultData(data) {
    allItems = data;
    updateCategoryCounts();

    // Check URL parameters (e.g. ?category=ncert or ?type=pyq or ?q=ras)
    var params = new URLSearchParams(window.location.search);
    var catParam = params.get('category');
    var typeParam = params.get('type');
    var queryParam = params.get('q');
    var classParam = params.get('class');

    if (catParam) {
      activeCategory = catParam.toLowerCase();
      categoryTabs.forEach(function (tab) {
        tab.classList.toggle('active', tab.dataset.category === activeCategory);
      });
    }

    if (typeParam) {
      activeType = typeParam.toLowerCase();
      typePills.forEach(function (pill) {
        pill.classList.toggle('active', pill.dataset.type === activeType);
      });
    }

    if (classParam) {
      activeNcertClass = classParam.toLowerCase();
      ncertChips.forEach(function (chip) {
        chip.classList.toggle('active', chip.dataset.class === activeNcertClass);
      });
    }

    if (queryParam) {
      searchKeyword = queryParam.toLowerCase().trim();
      if (searchInput) searchInput.value = queryParam;
    }

    toggleNcertSlider();
    renderVault();
  }

  if (window.LIBRARY_VAULT && window.LIBRARY_VAULT.length) {
    processVaultData(window.LIBRARY_VAULT);
  } else {
    fetch('data/vault.json')
      .then(function (res) { return res.json(); })
      .then(processVaultData)
      .catch(function (err) {
        if (window.LIBRARY_VAULT && window.LIBRARY_VAULT.length) {
          processVaultData(window.LIBRARY_VAULT);
        } else {
          console.error('Failed to load study vault:', err);
          if (vaultGrid) {
            vaultGrid.innerHTML =
              '<div class="no-results">' +
                '<h3>Unable to load study materials</h3>' +
                '<p>Please check your connection and refresh the page.</p>' +
              '</div>';
          }
        }
      });
  }


  // Category Tab Click Handlers
  categoryTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activeCategory = this.dataset.category;
      categoryTabs.forEach(function (t) { t.classList.remove('active'); });
      this.classList.add('active');
      toggleNcertSlider();
      renderVault();
    });
  });


  // Show or hide NCERT Class Slider based on active category
  function toggleNcertSlider() {
    if (ncertSliderWrapper) {
      if (activeCategory === 'ncert') {
        ncertSliderWrapper.style.display = 'flex';
      } else {
        ncertSliderWrapper.style.display = 'none';
        activeNcertClass = 'all';
        ncertChips.forEach(function (chip) {
          chip.classList.toggle('active', chip.dataset.class === 'all');
        });
      }
    }
  }


  // Document Type Pill Click Handlers
  typePills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      activeType = this.dataset.type;
      typePills.forEach(function (p) { p.classList.remove('active'); });
      this.classList.add('active');
      renderVault();
    });
  });


  // Real-time Instant Search Input
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      searchKeyword = this.value.toLowerCase().trim();
      renderVault();
    });
  }


  // Compute and display counts on each category tab
  function updateCategoryCounts() {
    var counts = {
      all: allItems.length,
      rpsc: 0,
      upsc: 0,
      ssc: 0,
      neet_jee: 0,
      ncert: 0,
      banking: 0,
      literature: 0
    };

    allItems.forEach(function (item) {
      if (counts[item.category] !== undefined) {
        counts[item.category]++;
      }
    });

    var setEl = function (id, count) {
      var el = document.getElementById(id);
      if (el) el.textContent = count;
    };

    setEl('countAll', counts.all);
    setEl('countRpsc', counts.rpsc);
    setEl('countUpsc', counts.upsc);
    setEl('countSsc', counts.ssc);
    setEl('countNeet', counts.neet_jee);
    setEl('countNcert', counts.ncert);
    setEl('countBanking', counts.banking);
    setEl('countLit', counts.literature);
  }


  // Render Vault Items Grid
  function renderVault() {
    if (!vaultGrid) return;

    var filtered = allItems.filter(function (item) {
      var matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      var matchesType = activeType === 'all' || item.type === activeType;

      var matchesNcertClass = true;
      if (activeCategory === 'ncert' && activeNcertClass !== 'all') {
        matchesNcertClass = item.classLevel === activeNcertClass;
      }

      var matchesSearch = !searchKeyword ||
        (item.title && item.title.toLowerCase().includes(searchKeyword)) ||
        (item.titleHindi && item.titleHindi.toLowerCase().includes(searchKeyword)) ||
        (item.exam && item.exam.toLowerCase().includes(searchKeyword)) ||
        (item.subject && item.subject.toLowerCase().includes(searchKeyword)) ||
        (item.medium && item.medium.toLowerCase().includes(searchKeyword)) ||
        (item.language && item.language.toLowerCase().includes(searchKeyword)) ||
        (item.summary && item.summary.toLowerCase().includes(searchKeyword)) ||
        (item.year && item.year.toString().toLowerCase().includes(searchKeyword)) ||
        (item.author && item.author.toLowerCase().includes(searchKeyword));

      return matchesCategory && matchesType && matchesNcertClass && matchesSearch;
    });

    if (filtered.length === 0) {
      vaultGrid.innerHTML =
        '<div class="no-results">' +
          '<h3>No matching study materials found</h3>' +
          '<p>Try searching for a different exam, year, or clearing the search filter.</p>' +
        '</div>';
      return;
    }

    vaultGrid.innerHTML = '';
    vaultGrid.classList.add('stagger');

    filtered.forEach(function (item) {
      var card = document.createElement('div');
      card.className = 'vault-card fade-up';

      var typeLabel =
        item.type === 'pyq' ? 'Previous Year Paper' :
        item.type === 'syllabus' ? 'Official Syllabus' :
        item.type === 'textbook' ? 'NCERT Textbook' : 'Public Domain Classic';

      var categoryTagClass = item.category.replace(/[^a-z0-9]/gi, '_');

      var officialBadgeHTML = item.officialSource ?
        '<div class="vault-official-badge">' +
          '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>' +
          '<span>Verified Official Release: ' + item.officialSource + '</span>' +
        '</div>' : '';

      var isExternal = item.isExternal || (item.pdfUrl && item.pdfUrl.indexOf('http') === 0);
      var sourceUrl = item.pdfUrl || item.officialDirectUrl || ('pdfs/' + item.id + '.pdf');
      var sourceName = item.officialSource || 'Govt Portal';

      var actionsHTML = '';
      if (isExternal) {
        actionsHTML =
          '<a href="read.html?id=' + encodeURIComponent(item.id) + '" class="btn btn-outline">' +
            'View Details' +
          '</a>' +
          '<a href="' + sourceUrl + '" target="_blank" rel="noopener" class="btn btn-primary">' +
            'Official Portal ↗' +
          '</a>';
      } else {
        actionsHTML =
          '<a href="read.html?id=' + encodeURIComponent(item.id) + '" class="btn btn-outline">' +
            'Read Online' +
          '</a>' +
          '<a href="' + sourceUrl + '" download="' + item.id + '.pdf" class="btn btn-primary">' +
            'Download PDF' +
          '</a>';
      }

      card.innerHTML =
        '<div>' +
          '<div class="vault-card-top">' +
            '<span class="vault-tag ' + categoryTagClass + '">' + item.exam + '</span>' +
            '<span class="vault-year">' + item.year + '</span>' +
          '</div>' +
          '<h3>' + item.title + '</h3>' +
          (item.titleHindi ? '<div class="vault-hindi-title">' + item.titleHindi + '</div>' : '') +
          '<p class="vault-summary">' + (item.summary || item.description || '') + '</p>' +
          officialBadgeHTML +
        '</div>' +
        '<div>' +
          '<div class="vault-meta-row">' +
            '<span>' + (item.pages ? item.pages + ' Pages' : 'Official Document') + '</span>' +
            '<span>' + item.language + '</span>' +
            '<span>' + typeLabel + '</span>' +
          '</div>' +
          '<div class="vault-card-actions">' +
            actionsHTML +
          '</div>' +
        '</div>';

      vaultGrid.appendChild(card);
    });

    // Re-observe elements for smooth fade animation
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });

      vaultGrid.querySelectorAll('.fade-up').forEach(function (el) {
        obs.observe(el);
      });
    }
  }

});
