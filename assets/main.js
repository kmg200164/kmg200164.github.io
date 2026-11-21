(function () {
  var root = document.documentElement;
  var btn = document.getElementById('lang');
  function set(lang) {
    lang = lang === 'en' ? 'en' : 'ko';
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    btn.textContent = lang === 'ko' ? 'EN' : 'KO';
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var param = new URLSearchParams(location.search).get('lang');
  set(param === 'en' || param === 'ko' ? param : saved || 'ko');
  btn.addEventListener('click', function () {
    set(root.getAttribute('data-lang') === 'ko' ? 'en' : 'ko');
  });
})();

// Native image viewing; ordinary image links still work with JavaScript disabled.
(function () {
  var root = document.documentElement;
  var dialog = document.getElementById('image-viewer');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  var returnTarget;
  document.querySelectorAll('.image-trigger').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      var source = link.querySelector('img');
      var image = dialog.querySelector('img');
      image.src = link.href;
      image.alt = source.alt;
      var lang = root.getAttribute('data-lang') === 'en' ? 'en' : 'ko';
      var text = source.getAttribute && source.getAttribute('data-caption-' + lang);
      dialog.querySelector('.viewer-caption').textContent = text || source.alt;
      returnTarget = link;
      if (!dialog.open) dialog.showModal();
    });
  });
  dialog.addEventListener('close', function () { if (returnTarget) returnTarget.focus(); });
  dialog.addEventListener('click', function (event) { if (event.target === dialog) dialog.close(); });
})();
