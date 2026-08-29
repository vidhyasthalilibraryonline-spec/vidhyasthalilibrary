/* ============================================
   VIDHYASTHALI LIBRARY — SHARED JS
   Navbar, scroll animations, page transitions,
   mobile menu, gallery lightbox
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // --- Navbar scroll effect ---
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
    // Check on load
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }


  // --- Active nav link ---
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });


  // --- Mobile menu toggle ---
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    function toggleMenu(open) {
      var isOpen = open !== undefined ? open : !navLinks.classList.contains('open');
      navToggle.classList.toggle('active', isOpen);
      navLinks.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleMenu();
    });

    // Close when clicking any nav link
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggleMenu(false);
      });
    });

    // Close when tapping outside on mobile
    document.addEventListener('click', function (e) {
      if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
        toggleMenu(false);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }


  // --- Scroll animations (Intersection Observer) ---
  var fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window && fadeEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }


  // --- Page transitions ---
  var overlay = document.querySelector('.page-transition');
  if (overlay) {
    // Intercept internal links for smooth transition
    document.querySelectorAll('a[href]').forEach(function (link) {
      var href = link.getAttribute('href');
      // Only intercept internal .html links (not anchors, not external)
      if (href &&
          href.endsWith('.html') &&
          !href.startsWith('http') &&
          !href.startsWith('mailto') &&
          !href.startsWith('tel') &&
          link.target !== '_blank') {
        link.addEventListener('click', function (e) {
          e.preventDefault();
          overlay.classList.add('active');
          setTimeout(function () {
            window.location.href = href;
          }, 300);
        });
      }
    });
  }


  // --- Gallery lightbox ---
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lightboxImg = lightbox.querySelector('img');
    document.querySelectorAll('.gallery-item img').forEach(function (img) {
      img.addEventListener('click', function () {
        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }


  // --- Smooth scroll for same-page anchors ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});

// --- Global Handcrafted Book Cover Generator ---
function renderBookCoverHTML(book) {
  var theme = book.theme || 'navy';
  var id = (book.id || '').toLowerCase();
  
  // Bespoke illustrated emblem matching book title / subject
  var emblemSvg = '';
  if (id.includes('godan')) {
    // Godan: Golden grain sheaves & Indian rural farm emblem
    emblemSvg = '<svg class="book-art-emblem" viewBox="0 0 64 64" fill="currentColor">' +
      '<path d="M32 6 C28 14 26 22 26 32 C26 42 29 48 32 58 M32 6 C36 14 38 22 38 32 C38 42 35 48 32 58 M20 18 C26 24 38 24 44 18 M16 32 C24 38 40 38 48 32 M18 46 C24 50 40 50 46 46" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>' +
      '<circle cx="32" cy="6" r="3.5"/>' +
    '</svg>';
  } else if (id.includes('panchatantra')) {
    // Panchatantra: Royal Lion / Forest Wisdom star emblem
    emblemSvg = '<svg class="book-art-emblem" viewBox="0 0 64 64" fill="currentColor">' +
      '<circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="3 3"/>' +
      '<path d="M32 14 L36 24 L46 26 L38 34 L40 44 L32 38 L24 44 L26 34 L18 26 L28 24 Z" fill="currentColor" opacity="0.95"/>' +
    '</svg>';
  } else if (id.includes('kabir')) {
    // Kabir ke Dohe: Divine spiritual lamp & flame
    emblemSvg = '<svg class="book-art-emblem" viewBox="0 0 64 64" fill="currentColor">' +
      '<path d="M32 10 C32 10 22 22 22 34 C22 42 26 48 32 50 C38 48 42 42 42 34 C42 22 32 10 32 10 Z" fill="none" stroke="currentColor" stroke-width="2.5"/>' +
      '<circle cx="32" cy="34" r="5"/>' +
      '<path d="M20 54 L44 54" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>' +
    '</svg>';
  } else if (id.includes('nirmala')) {
    // Nirmala: Traditional Indian heritage medallion
    emblemSvg = '<svg class="book-art-emblem" viewBox="0 0 64 64" fill="currentColor">' +
      '<path d="M32 12 C22 12 14 24 14 36 C14 46 22 52 32 52 C42 52 50 46 50 36 C50 24 42 12 32 12 Z" fill="none" stroke="currentColor" stroke-width="2"/>' +
      '<circle cx="32" cy="32" r="8" fill="none" stroke="currentColor" stroke-width="2"/>' +
      '<circle cx="32" cy="32" r="3.5"/>' +
    '</svg>';
  } else if (id.includes('art-of-war')) {
    // The Art of War: Ancient crossed swords & victory crest
    emblemSvg = '<svg class="book-art-emblem" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">' +
      '<path d="M16 16 L48 48 M48 16 L16 48 M12 20 L20 12 M44 12 L52 20 M12 44 L20 52 M44 52 L52 44"/>' +
      '<circle cx="32" cy="32" r="6" fill="currentColor"/>' +
    '</svg>';
  } else if (id.includes('sherlock')) {
    // Sherlock Holmes: Victorian magnifying glass
    emblemSvg = '<svg class="book-art-emblem" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5">' +
      '<circle cx="28" cy="28" r="15"/>' +
      '<line x1="39" y1="39" x2="53" y2="53" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="28" cy="28" r="7" stroke-dasharray="2 3"/>' +
    '</svg>';
  } else if (id.includes('pride')) {
    // Pride & Prejudice: Regency royal quill & crest
    emblemSvg = '<svg class="book-art-emblem" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2">' +
      '<path d="M48 12 C44 24 36 34 24 42 L16 48 L22 40 C30 28 40 18 48 12 Z" fill="currentColor" opacity="0.85"/>' +
      '<path d="M16 48 C20 54 36 54 48 48" stroke-width="2.5" stroke-linecap="round"/>' +
    '</svg>';
  } else {
    // Academic & Foundation Classics: Seal of Knowledge
    emblemSvg = '<svg class="book-art-emblem" viewBox="0 0 64 64" fill="currentColor">' +
      '<path d="M32 10 L48 20 L48 44 L32 54 L16 44 L16 20 Z" fill="none" stroke="currentColor" stroke-width="2.5"/>' +
      '<path d="M32 24 L40 30 L40 38 L32 44 L24 38 L24 30 Z"/>' +
    '</svg>';
  }

  var seriesLabel = book.language === 'Hindi' ? 'हिंदी साहित्य' : (book.exam ? book.exam : 'WORLD CLASSIC');
  var displayAuthor = book.author || book.authorEn || book.exam || 'Official';

  return '<div class="book-art theme-' + theme + '">' +
    '<div class="book-art-top">' +
      emblemSvg +
      '<span class="book-art-series">' + seriesLabel + '</span>' +
    '</div>' +
    '<div class="book-art-middle">' +
      '<div class="book-art-title">' + book.title + '</div>' +
      '<div class="book-art-author">' + displayAuthor + '</div>' +
    '</div>' +
    '<div class="book-art-bottom">' +
      '<span class="book-art-seal">VIDHYASTHALI</span>' +
    '</div>' +
  '</div>';
}

