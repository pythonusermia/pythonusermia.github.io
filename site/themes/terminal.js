window.THEMES = window.THEMES || {};
window.THEMES.terminal = {
  label: "Terminal",
  css: "site/themes/terminal.css",
  render: function (d, h) {
    var e = h.esc;
    var links = h.list(d.links).map(function (l) {
      return '<a href="' + h.url(l.url) + '"' + h.ext(l.url) + ">" + e(String(l.label).toLowerCase()) + "</a>";
    }).join("");
    var jobs = h.list(d.experience).map(function (j) {
      var body = '<div class="when">' + e(j.dates) + '</div><div class="jt">' +
        "<h3>" + e(j.role) + " <span>· " + e(j.org) + "</span></h3>" +
        "<p>" + e(j.summary) + "</p>" +
        '<ul class="stack">' + h.list(j.tags).map(function (t) { return "<li>" + e(t) + "</li>"; }).join("") + "</ul>" +
        "</div>";
      var photos = h.list(j.photos);
      if (!photos.length) return '<div class="job">' + body + "</div>";
      // jobs with photos become a card that flips over to a pile of polaroids
      var pile = photos.map(function (ph) {
        return '<button type="button" class="polaroid" data-full="' + h.url(ph.src) + '" data-cap="' + e(ph.caption) + '" aria-label="Enlarge photo: ' + e(ph.alt || ph.caption) + '">' +
          '<img src="' + h.url(ph.src) + '" alt="' + e(ph.alt || "") + '" loading="lazy"><span>' + e(ph.caption) + "</span></button>";
      }).join("");
      return '<div class="job has-flip"><div class="flipper">' +
        '<div class="face front">' + body + '<button type="button" class="flip-btn" aria-expanded="false">flip for photos \u21bb</button></div>' +
        '<div class="face back"><div class="polaroids">' + pile + '</div><button type="button" class="flip-btn" aria-expanded="true">\u21ba back to details</button></div>' +
        "</div></div>";
    }).join("");
    var projects = h.list(d.projects).map(function (p) {
      var title = p.url ? '<a href="' + h.url(p.url) + '"' + h.ext(p.url) + ">" + e(p.name) + "</a>" : e(p.name);
      return '<article class="proj"><div class="top"><span>' + e(String(p.when || "").toLowerCase()) + "</span><span>" +
        e(h.list(p.stack).join(" · ").toLowerCase()) + "</span></div><h3>" + title + "</h3><p>" + e(p.summary) + "</p>" +
        (p.result ? '<div class="metric">' + e(p.result) + "</div>" : "") + "</article>";
    }).join("");
    function chips(items) {
      return '<ul class="stack">' + h.list(items).map(function (t) { return "<li>" + e(t) + "</li>"; }).join("") + "</ul>";
    }
    // a section drawn as a little terminal window: title bar + body
    function card(id, tone, inner) {
      return '<section id="' + id + '" class="card tone-' + tone + '"><div class="bar"><i></i><i></i><i></i><h2>~/' + id + '</h2></div><div class="body">' + inner + "</div></section>";
    }
    var skills = h.list(d.skills).map(function (s) {
      return '<div class="sg"><h3>' + e(String(s.group).toLowerCase()) + "</h3>" + chips(s.items) + "</div>";
    }).join("");
    var awards = h.list(d.awards).length ? card("awards", "blue", chips(d.awards)) : "";
    var now = h.list(d.now).length
      ? '<div class="now"><div class="now-t"><span class="live" aria-hidden="true"></span>now</div><dl>' +
        d.now.map(function (n) { return "<dt>" + e(n.label) + "</dt><dd>" + e(n.text) + "</dd>"; }).join("") + "</dl></div>"
      : "";
    var user = e(h.first.toLowerCase() || "me");

    return '<div class="shell"><aside>' +
      '<div class="prompt">' + user + "@portfolio:~$ whoami</div>" +
      h.avatar("t-photo") +
      "<h1>" + e(d.name) + '<span class="cursor" aria-hidden="true"></span></h1>' +
      '<p class="role">' + e(d.school) + "</p>" + now +
      '<ul class="side-nav"><li><a href="#about">about</a></li><li><a href="#experience">experience</a></li><li><a href="#projects">projects</a></li><li><a href="#skills">skills</a></li></ul>' +
      '<div class="links">' + (d.email ? '<a href="mailto:' + e(d.email) + '">' + e(d.email) + "</a>" : "") + links +
      (d.resume ? '<a href="' + h.url(d.resume) + '">resume.pdf</a>' : "") + "</div>" +
      (d.status ? '<div class="status"><b>●</b> ' + e(d.status) + "</div>" : "") +
      "</aside><main>" +
      card("about", "blue", '<p class="headline">' + e(d.headline) + "</p><p>" + e(d.about) + "</p>") +
      '<div class="cols">' + card("experience", "green", jobs) +
      '<div class="col-r">' + card("skills", "pink", skills) + awards + "</div></div>" +
      card("projects", "pink", '<div class="projects">' + projects + "</div>") +
      "<footer>© " + new Date().getFullYear() + " " + e(d.name) + " · " + e(d.location) + "</footer>" +
      "</main></div>";
  },
};

/* Flip cards and the photo viewer for experience entries that have photos. */
(function () {
  if (window.__pfFlip) return;
  window.__pfFlip = true;

  function lightbox(pol) {
    var prev = document.activeElement;
    var ov = document.createElement("div");
    ov.className = "lb";
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.setAttribute("aria-label", "Photo viewer");
    var fig = document.createElement("figure");
    var img = document.createElement("img");
    img.src = pol.getAttribute("data-full");
    img.alt = pol.querySelector("img").alt;
    var cap = document.createElement("figcaption");
    cap.textContent = pol.getAttribute("data-cap");
    var x = document.createElement("button");
    x.type = "button";
    x.className = "lb-x";
    x.setAttribute("aria-label", "Close photo");
    x.textContent = "\u00d7";
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

  document.addEventListener("click", function (ev) {
    var t = ev.target.closest ? ev.target.closest(".flip-btn, .polaroid") : null;
    if (!t) return;
    if (t.classList.contains("polaroid")) { lightbox(t); return; }
    var job = t.closest(".job");
    var flipped = job.classList.toggle("flipped");
    // hand keyboard focus to the button on the side that's now showing
    setTimeout(function () {
      var b = job.querySelector(flipped ? ".back .flip-btn" : ".front .flip-btn");
      if (b) b.focus({ preventScroll: true });
    }, 380);
  });
})();
