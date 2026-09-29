/* Portfolio engine: reads content.js and draws it with the chosen theme.
   You don't need to edit this file. */
(function () {
  var d = window.PORTFOLIO || {};
  var T = window.THEMES || {};
  var names = Object.keys(T);

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function url(u) {
    u = String(u || "").trim();
    return /^(https?:\/\/|mailto:|#)/i.test(u) || /^[\w./-]+$/.test(u) ? esc(u) : "#";
  }
  var initials = d.initials || String(d.name || "").split(/\s+/).map(function (w) { return w[0] || ""; }).join("").slice(0, 2).toUpperCase();

  var h = {
    esc: esc,
    url: url,
    first: String(d.name || "").split(" ")[0],
    list: function (a) { return Array.isArray(a) ? a : []; },
    avatar: function (cls) {
      return d.photo
        ? '<img class="' + cls + '" src="' + url(d.photo) + '" alt="Photo of ' + esc(d.name) + '">'
        : '<div class="' + cls + '" role="img" aria-label="' + esc(d.name) + '">' + esc(initials) + "</div>";
    },
    abbr: function (org) {
      var words = String(org || "").split(/\s+/).filter(Boolean);
      if (words[0] && words[0].length <= 5 && words[0] === words[0].toUpperCase()) return words[0];
      return words.map(function (w) { return w[0]; }).join("").slice(0, 3).toUpperCase();
    },
    // external link attrs
    ext: function (u) { return /^https?:/i.test(u) ? ' target="_blank" rel="noopener"' : ""; },
  };

  function currentTheme() {
    var q = null;
    try { q = new URLSearchParams(location.search).get("theme"); } catch (e) {}
    if (q && T[q]) return q;
    return T[d.theme] ? d.theme : names[0];
  }

  function draw(name) {
    var theme = T[name];
    document.getElementById("theme-css").setAttribute("href", theme.css);
    document.documentElement.setAttribute("data-style", name);
    document.getElementById("app").innerHTML = theme.render(d, h);
    document.title = d.name ? d.name + " · Portfolio" : "Portfolio";
    if (d.showThemePicker !== false) picker(name);
  }

  function picker(active) {
    var el = document.getElementById("pf-picker");
    if (!el) {
      el = document.createElement("div");
      el.id = "pf-picker";
      el.setAttribute("role", "group");
      el.setAttribute("aria-label", "Preview styles");
      document.body.appendChild(el);
      var st = document.createElement("style");
      st.textContent =
        "#pf-picker{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:50;display:flex;align-items:center;gap:4px;padding:5px;background:#16181D;border-radius:999px;box-shadow:0 8px 30px rgba(0,0,0,.25);font:500 13px/1 system-ui,-apple-system,Segoe UI,Arial,sans-serif}" +
        "#pf-picker span{color:#9AA0AC;padding:0 8px 0 10px}" +
        "#pf-picker button{font:inherit;border:0;cursor:pointer;border-radius:999px;padding:8px 13px;background:transparent;color:#E8EAEE}" +
        "#pf-picker button[aria-pressed=true]{background:#F4F5F7;color:#16181D}" +
        "#pf-picker button:focus-visible{outline:2px solid #7EA2F0;outline-offset:2px}" +
        "@media (max-width:480px){#pf-picker span{display:none}}";
      document.head.appendChild(st);
    }
    el.innerHTML = "<span>Style</span>" + names.map(function (n) {
      return '<button type="button" data-t="' + n + '" aria-pressed="' + (n === active) + '">' + esc(T[n].label) + "</button>";
    }).join("");
    el.onclick = function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      var n = b.getAttribute("data-t");
      try { history.replaceState(null, "", "?theme=" + n); } catch (err) {}
      draw(n);
    };
  }

  if (!names.length) {
    document.getElementById("app").textContent = "No themes found. Check that the site/themes files are in place.";
    return;
  }
  draw(currentTheme());
})();
