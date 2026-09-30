/* Terminal theme: one shell (sidebar + footer stay put) with four pages that swap in the main area.
   Pages live at #/home, #/experience, #/projects and #/about. Moving between them plays a pixel wipe. */
window.THEMES = window.THEMES || {};
(function () {
  var PAGES = ["home", "experience", "projects", "about"];
  var LABELS = { home: "Portfolio", experience: "Experience", projects: "Projects", about: "About", notfound: "Lost page" };
  var ctx = null;            // { d, h } from the last render, used when a page swaps in
  var current = "home";
  var busy = false, pending = null;

  function routeFromHash() {
    var m = String(location.hash || "").replace(/^#\/?/, "").split(/[/?]/)[0].toLowerCase();
    if (!m) return "home";
    return PAGES.indexOf(m) > -1 ? m : "notfound";
  }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

  /* ---------- small building blocks ---------- */
  function chips(h, items) {
    return '<ul class="stack">' + h.list(items).map(function (t) { return "<li>" + h.esc(t) + "</li>"; }).join("") + "</ul>";
  }
  // a section drawn as a little terminal window: title bar + body
  function card(id, tone, inner, title) {
    return '<section id="' + id + '" class="card tone-' + tone + '"><div class="bar"><i></i><i></i><i></i><h2>~/' + (title || id) + '</h2></div><div class="body">' + inner + "</div></section>";
  }
  function btn(href, text, ext) { return '<a class="btn" href="' + href + '"' + (ext || "") + ">" + text + "</a>"; }

  function polaroid(ph, h) {
    var e = h.esc;
    var pos = ph.pos && /^[0-9% .a-z-]+$/i.test(ph.pos) ? ' style="object-position:' + e(ph.pos) + '"' : "";
    return '<button type="button" class="polaroid" data-full="' + h.url(ph.src) + '" data-cap="' + e(ph.caption) + '" aria-label="Enlarge photo: ' + e(ph.alt || ph.caption) + '">' +
      '<img src="' + h.url(ph.src) + '" alt="' + e(ph.alt || "") + '" loading="lazy"' + pos + "><span>" + e(ph.caption) + "</span></button>";
  }

  // an Experience-page section for an organization: role, big numbers, highlights, and a pile of photos
  function involvementHtml(o, h) {
    var e = h.esc;
    var stats = h.list(o.stats).length
      ? '<div class="stats">' + o.stats.map(function (s) { return '<div class="stat"><strong>' + e(s.value) + "</strong><span>" + e(s.label) + "</span></div>"; }).join("") + "</div>"
      : "";
    var bullets = h.list(o.highlights).length
      ? '<ul class="bullets">' + o.highlights.map(function (t) { return "<li>" + e(t) + "</li>"; }).join("") + "</ul>" : "";
    var pile = h.list(o.photos).length ? '<div class="polaroids pile" data-n="' + o.photos.length + '">' + o.photos.map(function (ph) { return polaroid(ph, h); }).join("") + "</div>" : "";
    return card(o.id || slug(o.org), o.tone || "green",
      '<div class="hero-top"><div><h3 class="edu-t">' + e(o.org) + '</h3><p class="edu-d">' + e(o.role) + "</p>" +
      (o.when ? '<div class="when">' + e(o.when) + "</div>" : "") + "</div>" + chips(h, o.tags) + "</div>" +
      (o.blurb ? '<p class="hero-sum">' + e(o.blurb) + "</p>" : "") + stats + bullets + pile);
  }

  function jobHtml(j, h) {
    var e = h.esc;
    var body = '<div class="when">' + e(j.dates) + '</div><div class="jt">' +
      "<h3>" + e(j.role) + " <span>· " + e(j.org) + "</span></h3>" +
      "<p>" + e(j.summary) + "</p>" + chips(h, j.tags) + "</div>";
    var photos = h.list(j.photos);
    if (!photos.length) return '<div class="job">' + body + "</div>";
    // jobs with photos become a card that flips over to a pile of polaroids
    var pile = photos.map(function (ph) { return polaroid(ph, h); }).join("");
    return '<div class="job has-flip"><div class="flipper">' +
      '<div class="face front">' + body + '<button type="button" class="flip-btn" aria-expanded="false">flip for photos ↻</button></div>' +
      '<div class="face back"><div class="polaroids">' + pile + '</div><button type="button" class="flip-btn" aria-expanded="true">↺ back to details</button></div>' +
      "</div></div>";
  }

  function projectHtml(p, h) {
    var e = h.esc;
    var title = p.url ? '<a href="' + h.url(p.url) + '"' + h.ext(p.url) + ">" + e(p.name) + "</a>" : e(p.name);
    return '<article class="proj"><div class="top"><span>' + e(String(p.when || "").toLowerCase()) + "</span><span>" +
      e(h.list(p.stack).join(" · ").toLowerCase()) + "</span></div><h3>" + title + "</h3><p>" + e(p.summary) + "</p>" +
      (p.result ? '<div class="metric">' + e(p.result) + "</div>" : "") + "</article>";
  }

  // the big Projects-page card: details plus a scrolling row of phone screenshots
  function heroHtml(p, h) {
    var e = h.esc;
    var shots = h.list(p.screens).map(function (s) {
      return '<figure class="shot-wrap"><button type="button" class="shot" data-full="' + h.url(s.src) + '" data-cap="' + e(s.caption) + '" aria-label="Enlarge screenshot: ' + e(s.caption) + '">' +
        '<img src="' + h.url(s.src) + '" alt="' + e(s.alt || s.caption) + '" loading="lazy"></button><figcaption>' + e(s.caption) + "</figcaption></figure>";
    }).join("");
    var bullets = h.list(p.highlights).length
      ? '<ul class="bullets">' + p.highlights.map(function (t) { return "<li>" + e(t) + "</li>"; }).join("") + "</ul>"
      : "";
    var link = p.url ? '<div class="btns">' + btn(h.url(p.url), "view project →", h.ext(p.url)) + "</div>" : "";
    return card(slug(p.name), "pink",
      '<div class="hero-top"><div><h3 class="hero-t">' + e(p.name) + '</h3><div class="hero-meta">' + e(p.when || "") + "</div></div>" + chips(h, p.stack) + "</div>" +
      (h.list(p.highlights).length ? "" : '<p class="hero-sum">' + e(p.summary) + "</p>") + bullets +
      (p.result ? '<div class="metric">' + e(p.result) + "</div>" : "") + link +
      (shots ? '<div class="shots-wrap"><button type="button" class="shots-nav prev" aria-label="Scroll screenshots left">‹</button>' +
        '<div class="shots" tabindex="0" role="region" aria-label="' + e(p.name) + ' screenshots">' + shots + "</div>" +
        '<button type="button" class="shots-nav next" aria-label="Scroll screenshots right">›</button></div>' : ""),
      slug(p.name));
  }

  /* ---------- pages ---------- */
  function featuredProject(d, h) {
    var ps = h.list(d.projects);
    return ps.filter(function (p) { return p.featured; })[0] || ps[0] || null;
  }

  function homePage(d, h) {
    var e = h.esc;
    var fp = featuredProject(d, h);
    var fj = h.list(d.experience).filter(function (j) { return h.list(j.photos).length; })[0] || h.list(d.experience)[0];
    var tiles = "";
    if (fp) {
      var img = h.list(fp.screens)[0];
      tiles += '<a class="tile" href="#/projects">' + (img ? '<span class="tile-img phone"><img src="' + h.url(img.src) + '" alt="" loading="lazy"></span>' : "") +
        '<span class="tile-body"><span class="tile-k">featured project</span><strong>' + e(fp.name) + "</strong><span>" + e(fp.summary) + '</span><span class="tile-go">view project →</span></span></a>';
    }
    if (fj) {
      var ph = h.list(fj.photos)[0];
      tiles += '<a class="tile" href="#/experience">' + (ph ? '<span class="tile-img"><img src="' + h.url(ph.src) + '" alt="" loading="lazy"></span>' : "") +
        '<span class="tile-body"><span class="tile-k">latest experience</span><strong>' + e(fj.role) + " · " + e(fj.org) + "</strong><span>" + e(fj.summary) + '</span><span class="tile-go">see experience →</span></span></a>';
    }
    return card("home", "blue",
      '<p class="headline">' + e(d.headline) + "</p>" + (d.tagline ? "<p>" + e(d.tagline) + "</p>" : "") +
      '<div class="btns">' + btn("#/projects", "see projects →") + btn("#/experience", "experience →") + btn("#/about", "about me →") + "</div>", "hello") +
      (tiles ? card("featured", "pink", '<div class="tiles">' + tiles + "</div>") : "");
  }

  function experiencePage(d, h) {
    // organizations with their own section below aren't repeated as a plain job card
    var orgs = h.list(d.involvement).map(function (o) { return String(o.org).toLowerCase(); });
    var jobs = h.list(d.experience).filter(function (j) { return orgs.indexOf(String(j.org).toLowerCase()) === -1; });
    return (jobs.length ? card("experience", "green", jobs.map(function (j) { return jobHtml(j, h); }).join("")) : "") +
      h.list(d.involvement).map(function (o) { return involvementHtml(o, h); }).join("");
  }

  function projectsPage(d, h) {
    var fp = featuredProject(d, h);
    var rest = h.list(d.projects).filter(function (p) { return p !== fp; });
    return (fp ? heroHtml(fp, h) : "") +
      (rest.length ? card("more-projects", "blue", '<div class="projects">' + rest.map(function (p) { return projectHtml(p, h); }).join("") + "</div>") : "");
  }

  function aboutPage(d, h) {
    var e = h.esc;
    var edu = h.list(d.education).map(function (u) {
      return '<h3 class="edu-t">' + e(u.school) + '</h3><p class="edu-d">' + e(u.degree) + (u.minor ? " · " + e(u.minor) : "") + "</p>" +
        (u.when ? '<div class="when">' + e(u.when) + "</div>" : "") +
        (h.list(u.coursework).length ? '<div class="sg"><h3>coursework</h3>' + chips(h, u.coursework) + "</div>" : "") +
        (h.list(u.involvement).length ? '<div class="sg"><h3>also involved in</h3>' + chips(h, u.involvement) + "</div>" : "");
    }).join("");
    var skills = h.list(d.skills).map(function (s) {
      return '<div class="sg"><h3>' + e(String(s.group).toLowerCase()) + "</h3>" + chips(h, s.items) + "</div>";
    }).join("");
    var links = h.list(d.links).map(function (l) { return btn(h.url(l.url), e(String(l.label).toLowerCase()) + " ↗", h.ext(l.url)); }).join("");
    var contact = '<div class="btns">' +
      (d.email ? '<button type="button" class="btn" data-copy="' + e(d.email) + '">copy email</button>' + btn("mailto:" + e(d.email), "email ↗") : "") +
      links + (d.resume ? btn(h.url(d.resume), "resume ↗") : "") + "</div>" +
      (d.email ? '<p class="mail">' + e(d.email) + "</p>" : "");
    return card("about", "blue", "<p>" + e(d.about) + "</p>" + (d.location ? '<p class="loc">' + e(d.location) + "</p>" : "")) +
      '<div class="cols even">' +
      (edu ? card("education", "green", edu) : "") + (skills ? card("skills", "pink", skills) : "") + "</div>" +
      '<div class="cols even">' +
      (h.list(d.awards).length ? card("awards", "blue", chips(h, d.awards)) : "") + card("contact", "green", contact) + "</div>";
  }

  function notFoundPage() {
    return card("404", "pink", '<p class="headline">this page wandered off.</p><p>the cat is looking for it. in the meantime:</p><div class="btns">' + btn("#/", "take me home →") + "</div>");
  }

  function pageHtml(route) {
    var d = ctx.d, h = ctx.h;
    if (route === "experience") return experiencePage(d, h);
    if (route === "projects") return projectsPage(d, h);
    if (route === "about") return aboutPage(d, h);
    if (route === "home") return homePage(d, h);
    return notFoundPage();
  }

  /* ---------- swapping pages ---------- */
  function setActive(route) {
    var shell = document.querySelector(".shell");
    if (shell) shell.setAttribute("data-page", route);
    var links = document.querySelectorAll("[data-page-link]");
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute("data-page-link") === route) links[i].setAttribute("aria-current", "page");
      else links[i].removeAttribute("aria-current");
    }
    var name = ctx && ctx.d && ctx.d.name;
    document.title = (name ? name + " · " : "") + (LABELS[route] || "Portfolio");
  }
  function mount(route) {
    var main = document.getElementById("page");
    if (!main) return;
    main.innerHTML = pageHtml(route);
    current = route;
    setActive(route);
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
    window.dispatchEvent(new CustomEvent("pf:route", { detail: { route: route } }));
  }

  // pixel wipe: a left-to-right swoosh of small blue pixels. It sweeps across and covers the page, the page
  // swaps underneath, then the swoosh carries on to the right and uncovers the new one.
  var BLUES = [[187, 214, 247], [127, 168, 236], [79, 127, 214]];   // light -> mid -> deep
  function blueAt(t, lift) {
    var seg = t < 0.5 ? 0 : 1, u = t < 0.5 ? t * 2 : (t - 0.5) * 2, a = BLUES[seg], b = BLUES[seg + 1], c = [];
    for (var i = 0; i < 3; i++) {
      var v = a[i] + (b[i] - a[i]) * u;
      c.push(Math.round(v + (255 - v) * lift));             // lift = a little white for pixel-to-pixel variation
    }
    return "rgb(" + c.join(",") + ")";
  }
  function noise(x, y) {                                      // steady per-pixel randomness, 0..1
    var n = (Math.imul(x, 73856093) ^ Math.imul(y, 19349663)) >>> 0;
    return (n % 1000) / 1000;
  }
  function wipe(swap, done) {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || document.hidden) { swap(); done(); return; }
    var W = window.innerWidth, H = window.innerHeight, dpr = Math.min(2, window.devicePixelRatio || 1);
    var cv = document.createElement("canvas");
    cv.setAttribute("aria-hidden", "true");
    cv.style.cssText = "position:fixed;left:0;top:0;width:" + W + "px;height:" + H + "px;z-index:250;pointer-events:none";
    cv.width = W * dpr;
    cv.height = H * dpr;
    document.body.appendChild(cv);
    var g = cv.getContext("2d");
    g.scale(dpr, dpr);
    var P = W < 600 ? 16 : 22, cols = Math.ceil(W / P), rows = Math.ceil(H / P);
    // when each pixel starts to appear: mostly by column, bowed so the front leads in the middle, plus a little scatter
    var delay = [], tint = [];
    for (var x = 0; x < cols; x++) {
      for (var y = 0; y < rows; y++) {
        var bow = 1 - Math.sin((y / rows) * Math.PI);                     // 0 in the middle, 1 at the top and bottom
        delay.push((x / cols) * 0.6 + bow * 0.07 + noise(x, y) * 0.08);
        tint.push(blueAt(x / cols, noise(y, x) * 0.28));
      }
    }
    var IN = 380, HOLD = 40, OUT = 380, swapped = false, t0 = performance.now();
    function ease(u) { return 1 - Math.pow(1 - u, 3); }
    function frame(now) {
      var t = now - t0;
      g.clearRect(0, 0, W, H);
      var covering = t < IN + HOLD;
      var local = covering ? t / IN : (t - IN - HOLD) / OUT;
      if (!covering && !swapped) { swapped = true; swap(); }
      for (var x = 0; x < cols; x++) {
        for (var y = 0; y < rows; y++) {
          var k = x * rows + y;
          var u = Math.max(0, Math.min(1, (local - delay[k]) / 0.25));
          if (!covering) u = 1 - u;
          else if (local >= 1) u = 1;
          if (u <= 0) continue;
          var s = u >= 1 ? P + 1 : ease(u) * P;
          g.fillStyle = tint[k];
          g.fillRect(x * P + (P - s) / 2, y * P + (P - s) / 2, s, s);
        }
      }
      if (t < IN + HOLD + OUT) requestAnimationFrame(frame);
      else { cv.remove(); done(); }
    }
    requestAnimationFrame(frame);
  }

  function go(route) {
    if (busy) { pending = route; return; }
    if (route === current) return;
    busy = true;
    wipe(function () { mount(route); }, function () {
      busy = false;
      var next = pending;
      pending = null;
      if (next && next !== current) go(next);
    });
  }

  window.addEventListener("hashchange", function () {
    if (!ctx || document.documentElement.getAttribute("data-style") !== "terminal") return;
    go(routeFromHash());
  });

  /* ---------- the theme ---------- */
  window.THEMES.terminal = {
    label: "Terminal",
    css: "site/themes/terminal.css?v=20260930a",
    render: function (d, h) {
      ctx = { d: d, h: h };
      busy = false;
      pending = null;
      var e = h.esc;
      current = routeFromHash();
      var links = h.list(d.links).map(function (l) {
        return '<a href="' + h.url(l.url) + '"' + h.ext(l.url) + ">" + e(String(l.label).toLowerCase()) + "</a>";
      }).join("");
      var now = h.list(d.now).length
        ? '<div class="now"><div class="now-t"><span class="live" aria-hidden="true"></span>now</div><dl>' +
          d.now.map(function (n) { return "<dt>" + e(n.label) + "</dt><dd>" + e(n.text) + "</dd>"; }).join("") + "</dl></div>"
        : "";
      var nav = PAGES.map(function (p) {
        return '<a href="#/' + (p === "home" ? "" : p) + '" data-page-link="' + p + '"' + (p === current ? ' aria-current="page"' : "") + ">" + p + "</a>";
      });
      var user = e(h.first.toLowerCase() || "me");

      return '<div class="shell" data-page="' + current + '">' +
        '<nav class="topnav" aria-label="Pages">' + nav.join("") + "</nav>" +
        "<aside>" +
        '<div class="prompt">' + user + "@portfolio:~$ whoami</div>" +
        h.avatar("t-photo") +
        "<h1>" + e(d.name) + '<span class="cursor" aria-hidden="true"></span></h1>' +
        '<p class="role">' + e(d.school) + "</p>" + now +
        '<nav class="side-nav" aria-label="Pages">' + nav.join("") + "</nav>" +
        '<div class="links">' + (d.email ? '<a href="mailto:' + e(d.email) + '">' + e(d.email) + "</a>" : "") + links +
        (d.resume ? '<a href="' + h.url(d.resume) + '">resume.pdf</a>' : "") + "</div>" +
        (d.status ? '<div class="status"><b>●</b> ' + e(d.status) + "</div>" : "") +
        "</aside>" +
        '<div class="stage"><main id="page" tabindex="-1">' + pageHtml(current) + "</main>" +
        "<footer>© " + new Date().getFullYear() + " " + e(d.name) + " · " + e(d.location) + "</footer></div>" +
        "</div>";
    },
    // called by the engine right after render(): keeps the tab title in step with the page
    after: function () { setActive(current); },
  };
})();

/* Flip cards, the screenshot row, the photo viewer and copy buttons. */
(function () {
  if (window.__pfFlip) return;
  window.__pfFlip = true;

  function lightbox(src) {
    var prev = document.activeElement;
    var ov = document.createElement("div");
    ov.className = "lb";
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.setAttribute("aria-label", "Photo viewer");
    var fig = document.createElement("figure");
    var img = document.createElement("img");
    img.src = src.getAttribute("data-full");
    img.alt = src.querySelector("img").alt;
    var cap = document.createElement("figcaption");
    cap.textContent = src.getAttribute("data-cap");
    var x = document.createElement("button");
    x.type = "button";
    x.className = "lb-x";
    x.setAttribute("aria-label", "Close photo");
    x.textContent = "×";
    fig.appendChild(img);
    fig.appendChild(cap);
    ov.appendChild(fig);
    ov.appendChild(x);
    function close() {
      ov.remove();
      document.removeEventListener("keydown", key);
      if (prev && prev.focus) prev.focus();
    }
    function key(e) {
      if (e.key === "Escape") close();
      else if (e.key === "Tab") e.preventDefault(); // the close button is the only stop
    }
    ov.addEventListener("click", function (e) { if (e.target !== img) close(); });
    document.addEventListener("keydown", key);
    document.body.appendChild(ov);
    x.focus();
  }

  function copy(text, btn) {
    function done() {
      var old = btn.textContent;
      btn.textContent = "copied!";
      setTimeout(function () { btn.textContent = old; }, 1500);
      window.dispatchEvent(new CustomEvent("pf:say", { detail: "copied!" }));
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, done);
    else {
      var ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (e) {}
      ta.remove();
      done();
    }
  }

  document.addEventListener("click", function (ev) {
    var t = ev.target.closest ? ev.target.closest(".flip-btn, .polaroid, .shot, .shots-nav, [data-copy]") : null;
    if (!t) return;
    if (t.classList.contains("polaroid") || t.classList.contains("shot")) { lightbox(t); return; }
    if (t.hasAttribute("data-copy")) { copy(t.getAttribute("data-copy"), t); return; }
    if (t.classList.contains("shots-nav")) {
      var row = t.parentNode.querySelector(".shots");
      var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      row.scrollBy({ left: (t.classList.contains("next") ? 1 : -1) * row.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
      return;
    }
    var job = t.closest(".job");
    var flipped = job.classList.toggle("flipped");
    // hand keyboard focus to the button on the side that's now showing
    setTimeout(function () {
      var b = job.querySelector(flipped ? ".back .flip-btn" : ".front .flip-btn");
      if (b) b.focus({ preventScroll: true });
    }, 380);
  });
})();
