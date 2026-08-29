/* ============================================
   VIDHYASTHALI LIBRARY — READER & DOCUMENT ROOM
   Clean on-site distraction-free reader & PDF viewer
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  var params = new URLSearchParams(window.location.search);
  var docId = params.get('id');
  var autoDownload = params.get('download') === '1';

  var coverEl = document.getElementById('readerCover');
  var titleEl = document.getElementById('readerTitle');
  var authorEl = document.getElementById('readerAuthor');
  var metaRow = document.getElementById('readerMeta');
  var curatorEl = document.getElementById('readerCurator');
  var embedWrap = document.getElementById('readerEmbed');
  var descEl = document.getElementById('readerDesc');
  var actionsWrap = document.getElementById('readerActions');

  if (!docId) {
    showError('No document selected. Please choose a paper or book from the catalog.');
    return;
  }

  function processReaderItem(items) {
    var item = items.find(function (b) { return b.id === docId; });

    if (!item) {
      showError('Document not found. It may have been updated or moved.');
      return;
    }

    var displayTitle = item.title || item.titleEn;
    var displayAuthor = item.author || item.exam || 'Official Document';

    // Update page title & meta
    document.title = displayTitle + ' — Free Read & Download | Vidhyasthali Library';
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = 'Read and download ' + displayTitle + ' for free on Vidhyasthali Library, Barmer.';
    }

    // Sidebar Cover Art
    if (coverEl) {
      coverEl.innerHTML = renderBookCoverHTML(item);
    }

    if (titleEl) titleEl.textContent = displayTitle;
    if (authorEl) authorEl.textContent = (item.titleHindi ? item.titleHindi + ' · ' : '') + displayAuthor;

    if (metaRow) {
      metaRow.innerHTML =
        '<span class="meta-tag">' + item.language + '</span>' +
        '<span class="meta-tag">' + (item.exam || item.genre || 'Official') + '</span>' +
        (item.year ? '<span class="meta-tag">' + item.year + '</span>' : '') +
        (item.pages ? '<span class="meta-tag">' + item.pages + ' pages</span>' : '') +
        (item.officialSource ? '<span class="meta-tag" style="background:rgba(45,138,78,0.12); color:#2D8A4E; font-weight:700;">✓ ' + item.officialSource + '</span>' : '');
    }

      if (descEl) {
        descEl.textContent = item.summary || item.description || '';
      }

      if (curatorEl && item.curatorNote) {
        curatorEl.innerHTML = '<span class="curator-label">Why We Recommend This</span>' + item.curatorNote;
      }

      var pdfUrl = item.pdfUrl || ('pdfs/' + item.id + '.pdf');
      var isExternal = pdfUrl.indexOf('http') === 0;
      var sourceName = item.officialSource || 'Official Website';

      // Sidebar Actions
      var govtPortalUrl = item.officialDirectUrl || 'https://ncert.nic.in/textbook.php';
      if (actionsWrap) {
        actionsWrap.innerHTML =
          '<a href="' + pdfUrl + '" target="_blank" class="btn btn-primary" style="font-size:0.85rem; padding:12px 18px; width:100%; justify-content:center; margin-top:14px;">' +
            'Open Original PDF (New Tab) ↗' +
          '</a>' +
          '<a href="' + pdfUrl + '" download="' + item.id + '.pdf" class="btn btn-outline" style="font-size:0.85rem; padding:10px 18px; width:100%; justify-content:center; margin-top:8px;">' +
            'Direct Download PDF' +
          '</a>' +
          '<a href="' + govtPortalUrl + '" target="_blank" rel="noopener" class="btn btn-outline" style="font-size:0.8rem; padding:9px 14px; width:100%; justify-content:center; margin-top:8px; background:rgba(45,138,78,0.08); color:#2D8A4E; border-color:rgba(45,138,78,0.3); font-weight:700;">' +
            '🏛️ Official Govt Portal (' + sourceName + ') ↗' +
          '</a>';
      }

      // Main Viewer area
      if (embedWrap) {
        var bodyText = item.excerpt || item.summary || item.description || '';
        var paragraphs = bodyText.split('\n\n').map(function (p) {
          return '<p>' + p.replace(/\n/g, '<br>') + '</p>';
        }).join('');

        var viewerHTML = '';

        if (isExternal) {
          // External official document — show info card + link to govt site
          viewerHTML =
            '<div style="background: linear-gradient(135deg, #1B2A4A 0%, #0F1A2E 100%); border-radius:12px; padding:48px 32px; text-align:center; margin-bottom:24px; box-shadow:0 8px 30px rgba(0,0,0,0.15);">' +
              '<div style="font-size:3rem; margin-bottom:16px;">🏛️</div>' +
              '<h2 style="color:#fff; font-family:\'Cormorant Garamond\', serif; font-size:1.6rem; margin-bottom:12px;">Official Government Document</h2>' +
              '<p style="color:rgba(255,255,255,0.7); font-size:0.95rem; max-width:500px; margin:0 auto 24px; line-height:1.7;">This is an original document from <strong style="color:#D4B56A;">' + sourceName + '</strong>. Click below to download the authentic PDF directly from the official website.</p>' +
              '<a href="' + pdfUrl + '" target="_blank" rel="noopener" style="display:inline-block; background:#D4B56A; color:#1B2A4A; font-weight:700; padding:14px 32px; border-radius:8px; text-decoration:none; font-size:0.95rem; transition:all 0.3s ease;">' +
                'Go to ' + sourceName + ' ↗' +
              '</a>' +
              '<p style="color:rgba(255,255,255,0.4); font-size:0.75rem; margin-top:16px;">You will be redirected to the official government website</p>' +
            '</div>';
        } else {
          // Local document — embed PDF viewer
          viewerHTML =
            '<div class="reader-toolbar">' +
              '<div class="reader-toolbar-left">' +
                '<span style="font-size:0.82rem; font-weight:700; color:var(--ink);">PDF Viewer</span>' +
              '</div>' +
              '<div class="reader-toolbar-right">' +
                '<a href="' + pdfUrl + '" target="_blank" class="reader-btn active" style="text-decoration:none;">Open in New Tab ↗</a>' +
                '<a href="' + pdfUrl + '" download="' + item.id + '.pdf" class="reader-btn" style="text-decoration:none;">Download</a>' +
              '</div>' +
            '</div>' +
            '<div style="background:#2A2A2E; border-radius:8px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.15); margin-bottom:24px;">' +
              '<iframe src="' + pdfUrl + '" style="width:100%; height:750px; border:none; display:block;" title="' + displayTitle + '"></iframe>' +
            '</div>';
        }

        // Document info section below viewer
        embedWrap.innerHTML = viewerHTML +
          '<div class="reader-paper theme-parchment" id="readerPaper">' +
            '<div style="border-bottom: 2px solid rgba(212,175,55,0.4); padding-bottom: 16px; margin-bottom: 24px;">' +
              '<div style="font-family:\'DM Sans\', sans-serif; font-size:0.75rem; font-weight:700; color:var(--burgundy); text-transform:uppercase; letter-spacing:2px; margin-bottom:6px;">' +
                (item.officialSource ? 'Official Source: ' + item.officialSource : 'Public Domain') +
              '</div>' +
              '<h1 class="reader-paper-title" style="margin-bottom:6px;">' + displayTitle + '</h1>' +
              (item.titleHindi ? '<div style="font-family:\'Cormorant Garamond\', serif; font-size:1.35rem; color:var(--burgundy); margin-bottom:8px;">' + item.titleHindi + '</div>' : '') +
              '<div class="reader-paper-author">' + displayAuthor + ' · Year: ' + item.year + '</div>' +
            '</div>' +
            '<div class="reader-paper-content" id="readerContent">' +
              paragraphs +
            '</div>' +
          '</div>';
      }

      // Structured Data
      var schema = {
        "@context": "https://schema.org",
        "@type": "Book",
        "name": displayTitle,
        "author": { "@type": "Organization", "name": displayAuthor },
        "inLanguage": item.language === 'Hindi' ? 'hi' : 'en',
        "description": item.summary || item.description,
        "url": window.location.href,
        "isAccessibleForFree": true
      };

      var script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    if (window.LIBRARY_VAULT && window.LIBRARY_VAULT.length) {
      processReaderItem(window.LIBRARY_VAULT);
    } else {
      fetch('data/vault.json')
        .then(function (res) { return res.json(); })
        .then(processReaderItem)
        .catch(function (err) {
          if (window.LIBRARY_VAULT && window.LIBRARY_VAULT.length) {
            processReaderItem(window.LIBRARY_VAULT);
          } else {
            console.error('Failed to load document:', err);
            showError('Something went wrong loading this document. Please try again.');
          }
        });
    }

  function showError(msg) {
    if (embedWrap) {
      embedWrap.innerHTML = '<div class="reader-loading">' + msg + '</div>';
    }
  }

});

