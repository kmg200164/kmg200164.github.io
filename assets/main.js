(function () {
  var root = document.documentElement;
  var btn = document.getElementById('lang');
  function set(lang) {
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
