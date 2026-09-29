window.THEMES = window.THEMES || {};
window.THEMES.story = {
  label: "Story",
  css: "site/themes/story.css",
  render: function (d, h) {
    var e = h.esc;
    var chips = [d.status ? '<span class="chip now">' + e(d.status) + "</span>" : "", d.location ? '<span class="chip">' + e(d.location) + "</span>" : "", d.school ? '<span class="chip">' + e(d.school) + "</span>" : ""].join("");
    // timeline reads oldest to newest
    var timeline = h.list(d.experience).slice().reverse().map(function (j) {
      return '<li><span class="yr">' + e(j.dates) + "</span><h3>" + e(j.role) + " at " + e(j.org) + "</h3><p>" + e(j.summary) + "</p></li>";
    }).join("");
    var cards = h.list(d.projects).map(function (p, i) {
      var name = p.url ? '<a href="' + h.url(p.url) + '"' + h.ext(p.url) + ">" + e(p.name) + "</a>" : e(p.name);
      var wide = i === 0 && d.projects.length % 2 === 1 ? " wide" : "";
      return '<article class="card c' + ((i % 3) + 1) + wide + '"><span class="kind">' + e(p.when) +
        (h.list(p.stack).length ? " · " + e(p.stack.join(", ")) : "") + "</span><h3>" + name + "</h3><p>" + e(p.summary) + "</p>" +
        (p.result ? '<span class="result">' + e(p.result) + "</span>" : "") + "</article>";
    }).join("");
    var tools = h.list(d.skills).map(function (s) {
      return "<div><h3>" + e(s.group) + "</h3><p>" + e(h.list(s.items).join(", ")) + "</p></div>";
    }).join("") + (h.list(d.awards).length ? "<div><h3>Recognition</h3><p>" + e(d.awards.join(", ")) + "</p></div>" : "");
    var links = h.list(d.links).map(function (l) {
      return '<a href="' + h.url(l.url) + '"' + h.ext(l.url) + ">" + e(l.label) + "</a>";
    }).join("");

    return '<div class="wrap">' +
      '<section class="intro">' + h.avatar("avatar") +
      "<h1>Hi, I'm " + e(h.first) + ". <em>" + e(d.tagline || d.headline) + "</em></h1>" +
      "<p>" + e(d.about) + "</p>" + (chips ? '<div class="chips">' + chips + "</div>" : "") + "</section>" +
      "<section><h2>How I got <em>here</em></h2><ol class=\"timeline\">" + timeline + "</ol></section>" +
      "<section><h2>Things I've <em>built</em></h2><div class=\"bento\">" + cards + "</div></section>" +
      "<section><h2>My <em>toolbox</em></h2><div class=\"toolbox\">" + tools + "</div></section>" +
      '<section class="contact"><h2>Say <em>hola</em></h2><div class="row">' +
      (d.email ? '<a href="mailto:' + e(d.email) + '">' + e(d.email) + "</a>" : "") + links +
      (d.resume ? '<a href="' + h.url(d.resume) + '">Resume</a>' : "") + "</div></section>" +
      "<footer>© " + new Date().getFullYear() + " " + e(d.name) + "</footer></div>";
  },
};
