window.THEMES = window.THEMES || {};
window.THEMES.clean = {
  label: "Clean",
  css: "site/themes/clean.css",
  render: function (d, h) {
    var e = h.esc;
    var projects = h.list(d.projects).map(function (p, i) {
      var tag = p.url ? "a" : "div";
      var href = p.url ? ' href="' + h.url(p.url) + '"' + h.ext(p.url) : "";
      return "<" + tag + ' class="proj"' + href + '><div class="shot"><div class="dots"><b></b><b></b><b></b></div>' +
        '<div class="screen s' + ((i % 4) + 1) + '">' + e(p.name) + "</div></div>" +
        "<h3>" + e(p.name) + " <small>" + e(h.list(p.stack).slice(0, 2).join(" · ")) + "</small></h3>" +
        "<p>" + e(p.summary) + (p.result ? " " + e(p.result) + "." : "") + "</p></" + tag + ">";
    }).join("");
    var xp = h.list(d.experience).map(function (j) {
      return '<li><div class="logo">' + e(h.abbr(j.org)) + '</div><div><div class="role">' + e(j.role) + '</div><div class="org">' +
        e(j.org) + (j.place ? " · " + e(j.place) : "") + "</div></div><time>" + e(j.dates) + "</time></li>";
    }).join("");
    var skills = [];
    h.list(d.skills).forEach(function (s) { h.list(s.items).forEach(function (it) { skills.push("<span>" + e(it) + "</span>"); }); });
    var awards = h.list(d.awards).length
      ? '<section><h2>Recognition</h2><div class="skills">' + d.awards.map(function (a) { return "<span>" + e(a) + "</span>"; }).join("") + "</div></section>"
      : "";
    var links = h.list(d.links).map(function (l, i) {
      return '<a class="btn' + (i === 0 ? " primary" : "") + '" href="' + h.url(l.url) + '"' + h.ext(l.url) + ">" + e(l.label) + "</a>";
    }).join("");

    return '<div class="wrap">' +
      '<header><div class="me">' + h.avatar("avatar") + e(d.name) + '</div><nav><a href="#work">Work</a><a href="#experience">Experience</a><a href="#contact">Contact</a></nav></header>' +
      '<section class="hero"><h1>' + e(d.headline) + " <span>" + e(d.school) + ".</span></h1><p>" + e(d.about) + "</p>" +
      (d.status ? '<span class="now"><i aria-hidden="true"></i>' + e(d.status) + "</span>" : "") + "</section>" +
      '<section id="work"><h2>Selected work</h2><div class="grid">' + projects + "</div></section>" +
      '<section id="experience"><h2>Experience</h2><ul class="xp">' + xp + "</ul></section>" +
      '<section><h2>Stack</h2><div class="skills">' + skills.join("") + "</div></section>" + awards +
      '<section id="contact" class="contact"><h2>Contact</h2><div class="links">' + links +
      (d.resume ? '<a class="btn" href="' + h.url(d.resume) + '">Resume</a>' : "") +
      (d.email ? '<a class="email" href="mailto:' + e(d.email) + '">' + e(d.email) + "</a>" : "") + "</div></section>" +
      "<footer>© " + new Date().getFullYear() + " " + e(d.name) + "</footer></div>";
  },
};
