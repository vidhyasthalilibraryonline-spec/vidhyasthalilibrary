/* ============================================
   VIDHYASTHALI LIBRARY — CONTACT FORM
   Validation + EmailJS integration
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // -------------------------------------------------------
  // EMAILJS SETUP INSTRUCTIONS:
  //
  // 1. Go to https://www.emailjs.com — create free account
  // 2. Email Services → Add Gmail → connect vidhyasthalilibraryonline@gmail.com
  //    → note the SERVICE ID
  // 3. Email Templates → Create with variables:
  //    {{from_name}}, {{from_email}}, {{phone}}, {{message}}
  //    → note the TEMPLATE ID
  // 4. Account → API Keys → copy PUBLIC KEY
  // 5. Replace the three values below:
  // -------------------------------------------------------
  var EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
  var EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
  var EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

  // Initialize EmailJS
  if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  var form = document.getElementById('contactForm');
  var statusEl = document.getElementById('formStatus');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var btn = form.querySelector('.btn-submit');
    var originalText = btn.textContent;

    var name = form.querySelector('[name="from_name"]').value.trim();
    var email = form.querySelector('[name="from_email"]').value.trim();
    var message = form.querySelector('[name="message"]').value.trim();
    var phone = form.querySelector('[name="phone"]').value.trim();

    // Validate
    if (!name || !email || !message) {
      showStatus('Please fill in all required fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    btn.textContent = 'Sending...';
    btn.disabled = true;

    // If EmailJS not configured, use mailto fallback
    if (typeof emailjs === 'undefined' || EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      var subject = 'Vidhyasthali Library Query from ' + name;
      var body = 'Hello Vidhyasthali Library Team,\n\n' + message + '\n\n---\nSender Details:\nName: ' + name + '\nEmail: ' + email + '\nPhone: ' + (phone || 'Not provided');
      window.location.href = 'mailto:vidhyasthalilibraryonline@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      btn.textContent = originalText;
      btn.disabled = false;
      showStatus('Thank you! Opening your email app to send directly to vidhyasthalilibraryonline@gmail.com', 'success');
      return;
    }

    // Send via EmailJS
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(function () {
        showStatus('Message sent. We will get back to you soon.', 'success');
        form.reset();
        btn.textContent = originalText;
        btn.disabled = false;
      })
      .catch(function (err) {
        console.error('EmailJS error:', err);
        showStatus('Could not send. Please try calling us directly.', 'error');
        btn.textContent = originalText;
        btn.disabled = false;
      });
  });


  function showStatus(msg, type) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = 'form-status ' + type;
    setTimeout(function () {
      statusEl.textContent = '';
      statusEl.className = 'form-status';
    }, 6000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

});
