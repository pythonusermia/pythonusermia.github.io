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
      return '<div class="job"><div class="when">' + e(j.dates) + "</div><div>" +
        "<h3>" + e(j.role) + " <span>· " + e(j.org) + "</span></h3>" +
        "<p>" + e(j.summary) + "</p>" +
        '<ul class="stack">' + h.list(j.tags).map(function (t) { return "<li>" + e(t) + "</li>"; }).join("") + "</ul>" +
        "</div></div>";
    }).join("");
    var projects = h.list(d.projects).map(function (p) {
      var title = p.url ? '<a href="' + h.url(p.url) + '"' + h.ext(p.url) + ">" + e(p.name) + "</a>" : e(p.name);
      return '<article class="proj"><div class="top"><span>' + e(String(p.when || "").toLowerCase()) + "</span><span>" +
        e(h.list(p.stack).join(" · ").toLowerCase()) + "</span></div><h3>" + title + "</h3><p>" + e(p.summary) + "</p>" +
        (p.result ? '<div class="metric">' + e(p.result) + "</div>" : "") + "</article>";
    }).join("");
    var skills = h.list(d.skills).map(function (s) {
      return "<dt>" + e(String(s.group).toLowerCase()) + "</dt><dd>" + e(h.list(s.items).join(", ")) + "</dd>";
    }).join("") + (h.list(d.awards).length ? "<dt>awards</dt><dd>" + e(d.awards.join(", ")) + "</dd>" : "");
    var user = e(h.first.toLowerCase() || "me");

    return '<div class="shell"><aside>' +
      '<div class="prompt">' + user + "@portfolio:~$ whoami</div>" +
      h.avatar("t-photo") +
      "<h1>" + e(d.name) + '<span class="cursor" aria-hidden="true"></span></h1>' +
      '<p class="role">' + e(d.school) + "</p>" +
      '<ul class="side-nav"><li><a href="#about">about</a></li><li><a href="#experience">experience</a></li><li><a href="#projects">projects</a></li><li><a href="#skills">skills</a></li></ul>' +
      '<div class="links">' + (d.email ? '<a href="mailto:' + e(d.email) + '">' + e(d.email) + "</a>" : "") + links +
      (d.resume ? '<a href="' + h.url(d.resume) + '">resume.pdf</a>' : "") + "</div>" +
      (d.status ? '<div class="status"><b>●</b> ' + e(d.status) + "</div>" : "") +
      "</aside><main>" +
      '<section id="about" class="about"><h2>about/</h2><p class="headline">' + e(d.headline) + "</p><p>" + e(d.about) + "</p></section>" +
      '<section id="experience"><h2>experience/</h2>' + jobs + "</section>" +
      '<section id="projects"><h2>projects/</h2><div class="projects">' + projects + "</div></section>" +
      '<section id="skills"><h2>skills/</h2><dl class="skills">' + skills + "</dl></section>" +
      "<footer>© " + new Date().getFullYear() + " " + e(d.name) + " · " + e(d.location) + "</footer>" +
      "</main></div>";
  },
};
