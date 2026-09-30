/* Fun extras for the Terminal style: typing intro, a pixel cat, a mini terminal,
   and small pixel details. Turn pieces off with `extras` in content.js. */
(function () {
  var d = window.PORTFOLIO || {};
  var opts = d.extras || {};
  function on(k) { return opts[k] !== false; }
  var reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  function list(a) { return Array.isArray(a) ? a : []; }
  function rand(a, b) { return a + Math.random() * (b - a); }
  var first = String(d.name || "me").split(" ")[0].toLowerCase();

  /* ---------- pixel art helpers ---------- */
  var PAL = { b: "#F8C8DC", s: "#E58FB4", e: "#2B3245", n: "#D2648F", o: "#3A4160", h: "#F08DB4" };

  function pad(rows, w) {
    return rows.map(function (r) { while (r.length < w) r += "."; return r; });
  }
  // adds a 1px dark outline around every filled pixel
  function outline(rows) {
    var w = rows[0].length, g = [], x, y;
    for (y = -1; y <= rows.length; y++) {
      var line = [];
      for (x = -1; x <= w; x++) line.push((rows[y] || "")[x] || ".");
      g.push(line);
    }
    return g.map(function (r, yy) {
      return r.map(function (c, xx) {
        if (c !== ".") return c;
        var near = [[0, -1], [0, 1], [-1, 0], [1, 0]].some(function (p) {
          var row = g[yy + p[1]];
          return row && row[xx + p[0]] && row[xx + p[0]] !== ".";
        });
        return near ? "o" : ".";
      }).join("");
    });
  }
  function svg(rows, px, pal) {
    pal = pal || PAL;
    var w = rows[0].length, h = rows.length, rects = "";
    rows.forEach(function (r, y) {
      var x = 0;
      while (x < w) {
        var c = r[x];
        if (c === ".") { x++; continue; }
        var x2 = x;
        while (x2 < w && r[x2] === c) x2++;
        rects += '<rect x="' + x + '" y="' + y + '" width="' + (x2 - x) + '" height="1" fill="' + pal[c] + '"/>';
        x = x2;
      }
    });
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + " " + h + '" width="' + w * px + '" height="' + h * px +
      '" shape-rendering="crispEdges" aria-hidden="true" focusable="false">' + rects + "</svg>";
  }

  var FRAMES = {
    walkA: [
      "..........s..s..", ".........bbbbbb.", ".........bebbeb.", "..b......bbnnbb.", "..b..bbbbbbbbb..",
      "..bbbbsbbsbbbb..", "...bbbbbbbbbbb..", "....b..b..b..b..", "....b..b..b..b..",
    ],
    walkB: [
      "..........s..s..", ".........bbbbbb.", ".........bebbeb.", ".b.......bbnnbb.", ".b...bbbbbbbbb..",
      ".bbbbbsbbsbbbb..", "...bbbbbbbbbbb..", ".....bb....bb...", ".....bb....bb...",
    ],
    sit: [
      "..........s..s..", ".........bbbbbb.", ".........bebbeb.", ".........bbnnbb.", "........bbbbbbb.",
      ".......bbbbbbbb.", ".......bbsbbsbb.", "..s....bbbbbbbb.", "...ssssbbbbbbbb.",
    ],
    sleep: [
      "................", "................", "................", "................", "..........s..s..",
      "...bbbbbbbbbbbb.", "..bbsbbsbbebbeb.", ".sbbbbbbbbbbnnb.", "..bbbbbbbbbbbb..",
    ],
  };
  var CAT_SVG = {};
  Object.keys(FRAMES).forEach(function (k) { CAT_SVG[k] = svg(outline(pad(FRAMES[k], 16)), 3); });

  // dark pink pixel Vision Pro used as the profile picture
  var VPAL = { D: "#8E2F5C", M: "#C2467F", K: "#5B1E3F", L: "#E58FB4", H: "#FBD5E5" };
  var VISION = (function () {
    var W = 18, H = 16, ext = { 3: [4, 13], 4: [2, 15], 5: [1, 16], 6: [1, 16], 7: [1, 16], 8: [1, 16], 9: [1, 16], 10: [2, 15], 11: [4, 13] };
    var glare = { "5,5": 1, "5,6": 1, "6,4": 1, "6,5": 1, "7,3": 1 };
    var rows = [];
    for (var y = 0; y < H; y++) {
      var row = "";
      for (var x = 0; x < W; x++) {
        var c = ".", e = ext[y];
        if (e && x >= e[0] && x <= e[1]) {
          if (y === 3 || y === 11) c = (y === 3 && x >= 6 && x <= 11) ? "L" : "M";
          else if (x === e[0] || x === e[1]) c = "M";
          else c = glare[y + "," + x] ? "H" : "K";
          if (y === 10 && x >= 7 && x <= 10) c = "M";
          if (y === 11 && x >= 7 && x <= 10) c = ".";
        }
        if (y >= 6 && y <= 8 && (x === 0 || x === W - 1)) c = "D";
        row += c;
      }
      rows.push(row);
    }
    return rows;
  })();

  var HEART = [
    ".hh...hh.", "hhhh.hhhh", "hhhhhhhhh", "hhhhhhhhh", ".hhhhhhh.", "..hhhhh..", "...hhh...", "....h....",
  ];
  var FACE = [
    ".s......s.", ".bbbbbbbb.", "bbbbbbbbbb", "bbebbbbebb", "bbbbnnbbbb", "bbbbbbbbbb", ".bbbbbbbb.",
  ];

  /* ---------- styles ---------- */
  function addStyles() {
    if (document.getElementById("px-style")) return;
    var st = document.createElement("style");
    st.id = "px-style";
    st.textContent =
      /* typing intro */
      ".shell aside>*:not(.prompt),.shell .stage,.shell .topnav{transition:opacity .7s ease}" +
      ".shell.px-intro aside>*:not(.prompt):not(h1):not(.role),.shell.px-intro .stage,.shell.px-intro .topnav{opacity:0}" +
      "body{position:relative}" +
      "#px-spirals{position:absolute;top:0;bottom:0;left:max(4px,calc(50vw - 540px - var(--sp) * 44px - 36px));width:calc(var(--sp) * 44px);background:url(images/spirals.png) repeat-y 0 0 / 100% auto;image-rendering:pixelated;pointer-events:none;z-index:-1;display:none;animation:px-drift 60s linear infinite}" +
      "@media (min-width:1300px){#px-spirals{--sp:2;display:block}}" +
      "@media (min-width:1500px){#px-spirals{--sp:3}}" +
      "@media (min-width:1760px){#px-spirals{--sp:4}}" +
      "@keyframes px-drift{to{background-position:0 calc(var(--sp) * -112px)}}" +
      "body>*:not(#px-boot){transition:opacity .6s ease}" +
      ".shell aside h1{transition:min-height .35s ease}" +
      ".shell.px-words aside h1{min-height:2.24em}" +
      ".px-typing::after{content:'\\258D';color:var(--accent-3);margin-left:1px;animation:t-blink 1s steps(1) infinite}" +
      /* heart */
      ".t-photo.px-avatar{width:74px;height:74px;background:#FFF1F7;padding:0}" +
      ".t-photo.px-avatar svg{display:block}" +
      ".px-logo{display:inline-block;color:var(--bright);margin-right:.3em;vertical-align:-.1em}" +
      ".px-heart{display:inline-block;line-height:0;vertical-align:-1px;animation:px-beat 1.6s ease-in-out infinite}" +
      "@keyframes px-beat{50%{transform:scale(1.18)}}" +
      /* cat */
      "#px-cat{position:fixed;left:0;bottom:env(safe-area-inset-bottom,0px);z-index:40;width:54px;height:33px;pointer-events:none;will-change:transform}" +
      "#px-cat .px-cat-btn{pointer-events:auto;display:block;border:0;background:none;padding:0;cursor:pointer;line-height:0;border-radius:6px}" +
      "#px-cat .px-cat-btn:focus-visible{outline:2px solid var(--accent);outline-offset:2px}" +
      "#px-cat .px-flip{display:block}" +
      "#px-cat.left .px-flip{transform:scaleX(-1)}" +
      "#px-cat .px-cat-btn.hop{animation:px-hop .35s ease-out}" +
      "@keyframes px-hop{40%{transform:translateY(-14px)}}" +
      ".px-bubble{position:absolute;left:-10px;bottom:100%;margin-bottom:6px;white-space:nowrap;font:500 12px var(--mono);background:#fff;color:var(--bright);border:1px solid var(--line);border-radius:8px;padding:3px 8px;opacity:0;pointer-events:none;transition:opacity .2s}" +
      ".px-bubble.r{left:auto;right:-10px}" +
      ".px-bubble.show{opacity:1}" +
      ".px-z{position:absolute;bottom:100%;left:34px;font:600 12px var(--mono);color:var(--accent);opacity:0;pointer-events:none}" +
      "#px-cat.sleeping .px-z{animation:px-z 2.4s linear infinite}" +
      "#px-cat.sleeping .px-z:nth-of-type(3){animation-delay:.8s}" +
      "#px-cat.sleeping .px-z:nth-of-type(4){animation-delay:1.6s}" +
      "@keyframes px-z{0%{opacity:0;transform:translate(0,0)}20%{opacity:1}100%{opacity:0;transform:translate(10px,-18px)}}" +
      /* mini terminal */
      "#px-term-btn{position:fixed;left:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:55;display:flex;align-items:center;gap:8px;font:500 13px/1 var(--mono);color:var(--bright);background:var(--pink);border:1px solid var(--line);border-radius:999px;padding:11px 14px;cursor:pointer;box-shadow:0 6px 18px rgba(58,109,179,.15)}" +
      "#px-term-btn:hover{background:var(--blue)}" +
      "#px-term-btn:focus-visible,.px-x:focus-visible{outline:2px solid var(--accent);outline-offset:2px}" +
      "#px-term-btn b{font-weight:500}" +
      "#px-term{position:fixed;left:16px;bottom:calc(68px + env(safe-area-inset-bottom,0px));z-index:60;width:min(640px,calc(100vw - 32px));height:min(340px,55vh);display:flex;flex-direction:column;background:var(--panel);border:1px solid var(--line);border-radius:12px;box-shadow:0 18px 50px rgba(20,26,43,.18);overflow:hidden;font:400 13px/1.55 var(--mono);color:var(--text)}" +
      "#px-term[hidden]{display:none}" +
      ".px-bar{display:flex;align-items:center;gap:6px;padding:8px 12px;background:var(--blue);color:var(--bright)}" +
      ".px-bar i{width:10px;height:10px;border-radius:50%;background:var(--pink)}" +
      ".px-bar i:nth-child(2){background:var(--green)}" +
      ".px-bar i:nth-child(3){background:#fff}" +
      ".px-bar span{margin-left:8px;flex:1;font-size:12px}" +
      ".px-x{border:0;background:none;font:inherit;font-size:18px;line-height:1;cursor:pointer;color:var(--bright);padding:0 4px;border-radius:4px}" +
      ".px-out{flex:1;overflow:auto;padding:12px 14px;overflow-wrap:anywhere}" +
      ".px-out div{white-space:pre-wrap}" +
      ".px-out .cmd{color:var(--bright)}" +
      ".px-out .cmd b{color:var(--accent-2);font-weight:500}" +
      ".px-out .err{color:var(--accent-3)}" +
      ".px-out .dim{color:var(--muted)}" +
      ".px-in{display:flex;gap:8px;padding:10px 14px;border-top:1px solid var(--line);margin:0}" +
      ".px-ps1{color:var(--accent-2);white-space:nowrap}" +
      ".px-in input{flex:1;min-width:0;border:0;outline:0;background:transparent;font:inherit;color:var(--bright);caret-color:var(--accent-3)}" +
      "@media (max-width:480px){#px-term-btn b{display:none}#px-term-btn{padding:11px 13px}.px-in input{font-size:16px}}" +
      "@media (prefers-reduced-motion:reduce){.px-heart,.px-typing::after,#px-spirals,#px-cat .px-cat-btn.hop,#px-cat.sleeping .px-z{animation:none}.shell aside>*:not(.prompt),.shell .stage,.shell .topnav{transition:none}}";
    document.head.appendChild(st);
  }

  /* ---------- typing intro ---------- */
  // the prompt types out, then your name is typed and erased; a few titles flash by, your name is
  // retyped, and finally the school line types out
  function intro() {
    var shell = document.querySelector(".shell");
    var p = document.querySelector(".prompt");
    if (!shell || !p || reduce || !on("typing")) return;
    var h1 = shell.querySelector("aside h1");
    var role = shell.querySelector("aside .role");
    var nameNode = h1 && h1.firstChild && h1.firstChild.nodeType === 3 ? h1.firstChild : null;
    var full = { p: p.textContent, name: nameNode ? nameNode.nodeValue : "", role: role ? role.textContent : "" };
    var words = list(opts.words).length ? opts.words : ["Software Engineer", "CS Student", "Apple Intern"];

    p.textContent = "";
    if (nameNode) nameNode.nodeValue = "";
    if (role) role.textContent = "";
    shell.classList.add("px-intro", "px-words");

    function alive() { return document.body.contains(p); }
    function later(fn, ms) { setTimeout(function () { if (alive()) fn(); }, ms); }
    function setP(t) { p.textContent = t; }
    function setName(t) { if (nameNode) nameNode.nodeValue = t; }
    function setRole(t) { if (role) role.textContent = t; }

    // small step queue: each step gets a callback for "I'm done, run the next one"
    var q = [];
    function pause(ms) { q.push(function (next) { later(next, ms); }); }
    function type(set, text, speed) {
      q.push(function (next) {
        var i = 0;
        (function step() {
          i++;
          set(text.slice(0, i));
          if (i < text.length) later(step, rand(speed * 0.7, speed * 1.3));
          else next();
        })();
      });
    }
    function erase(set, text, speed) {
      q.push(function (next) {
        var i = text.length;
        (function step() {
          i--;
          set(text.slice(0, i));
          if (i > 0) later(step, speed);
          else next();
        })();
      });
    }
    function run(fn) { q.push(function (next) { fn(); next(); }); }
    function finish() {
      p.classList.remove("px-typing");
      if (role) role.classList.remove("px-typing");
      shell.classList.remove("px-intro", "px-words");
    }

    run(function () { p.classList.add("px-typing"); });
    type(setP, full.p, 55);
    run(function () { p.classList.remove("px-typing"); shell.classList.remove("px-intro"); }); // rest of the page fades in
    pause(250);
    type(setName, full.name, 80);
    pause(600);
    var shown = full.name;
    words.concat([full.name]).forEach(function (w, i) {
      erase(setName, shown, 30);
      pause(250);
      if (i === words.length) run(function () { shell.classList.remove("px-words"); }); // name is back: let the heading shrink to one line
      type(setName, w, i === words.length ? 80 : 55);
      pause(i === words.length ? 300 : 450);
      shown = w;
    });
    run(function () { if (role) role.classList.add("px-typing"); });
    type(setRole, full.role, 32);
    pause(350);
    run(finish);

    var i = 0;
    (function go() { if (i < q.length) q[i++](go); })();

    // safety net: never leave the page half-typed
    setTimeout(function () {
      if (!alive() || !shell.classList.contains("px-words")) return;
      setP(full.p); setName(full.name); setRole(full.role);
      finish();
    }, 22000);
  }

  /* ---------- spiral flourish ---------- */
  function spirals() {
    if (!on("spirals") || document.getElementById("px-spirals")) return;
    // a full-height strip down the left margin that tiles the flourish, so it runs the whole length of the page
    var strip = document.createElement("div");
    strip.id = "px-spirals";
    strip.setAttribute("aria-hidden", "true");
    document.body.appendChild(strip);
  }

  /* ---------- pixel details ---------- */
  function pixels() {
    var f = document.querySelector("footer");
    if (f && !f.querySelector(".px-heart")) {
      f.insertAdjacentHTML("beforeend", ' · made with <span class="px-heart" role="img" aria-label="love">' + svg(HEART, 2) + "</span>" + (on("cat") ? " and a cat" : ""));
    }
    var ph = document.querySelector(".t-photo");
    if (on("avatar") && ph && ph.tagName !== "IMG" && !ph.querySelector("svg")) {
      ph.innerHTML = svg(VISION, 4, VPAL);
      ph.classList.add("px-avatar");
    }
    var link = document.querySelector("link[rel~=icon]");
    if (!link) { link = document.createElement("link"); link.rel = "icon"; document.head.appendChild(link); }
    link.type = "image/svg+xml";
    link.href = "data:image/svg+xml," + encodeURIComponent(svg(outline(FACE), 1));
  }

  var LOGOS = {
    apple: '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>',
  };
  // small logo before an experience entry's org name, matched by the first word of the org
  function logos() {
    if (!on("logos")) return;
    document.querySelectorAll(".job h3 span, .edu-t").forEach(function (sp) {
      if (sp.querySelector(".px-logo")) return;
      var key = sp.textContent.replace(/^[\s\u00b7]+/, "").split(/[\s\u2013-]/)[0].toLowerCase();
      if (LOGOS[key] && sp.firstChild && sp.firstChild.nodeType === 3) {
        // put the logo between the "\u00b7 " separator and the org name
        var m = sp.firstChild.nodeValue.match(/^([\s\u00b7]+)/);
        if (m) sp.firstChild.splitText(m[1].length);
        var tag = document.createElement("span");
        tag.className = "px-logo";
        tag.innerHTML = LOGOS[key];
        sp.insertBefore(tag, m ? sp.firstChild.nextSibling : sp.firstChild);   // after a "· " separator, or at the very start
      }
    });
  }

  /* ---------- cat ---------- */
  var cat = null;
  var LINES = ["meow!", "mrrp?", "purr~", "feed me", "*blink*", "hire mia?", "nyaa"];

  function mountCat() {
    if (cat) return;
    var el = document.createElement("div");
    el.id = "px-cat";
    el.innerHTML = '<div class="px-bubble" role="status"></div>' +
      '<button type="button" class="px-cat-btn" aria-label="Pet the cat"><span class="px-flip"></span></button>' +
      '<span class="px-z" aria-hidden="true">z</span><span class="px-z" aria-hidden="true">z</span><span class="px-z" aria-hidden="true">z</span>';
    document.body.appendChild(el);
    var btn = el.querySelector(".px-cat-btn"), flip = el.querySelector(".px-flip"), bubble = el.querySelector(".px-bubble");

    var W = 54, x = rand(0, Math.max(0, window.innerWidth - W)), target = x, state = "sit", timer = 1, speed = 45;
    var frame = "", acc = 0, step = 0, bubbleTimer = 0, raf = 0, last = 0;

    function maxX() { return Math.max(0, window.innerWidth - W); }
    function setFrame(name) {
      if (name === frame) return;
      frame = name;
      flip.innerHTML = CAT_SVG[name];
    }
    function place() {
      el.style.transform = "translateX(" + Math.round(x) + "px)";
      el.classList.toggle("sleeping", state === "sleep");
    }
    function say(text) {
      bubble.textContent = text;
      bubble.classList.toggle("r", x > window.innerWidth - 130);
      bubble.classList.add("show");
      clearTimeout(bubbleTimer);
      bubbleTimer = setTimeout(function () { bubble.classList.remove("show"); }, 1600);
    }
    function hop() {
      btn.classList.remove("hop");
      void btn.offsetWidth;
      btn.classList.add("hop");
    }
    function sit(t) { state = "sit"; timer = t; setFrame("sit"); }
    function walkTo(tx, sp) { target = Math.max(0, Math.min(maxX(), tx)); speed = sp; state = "walk"; }

    function update(dt) {
      if (state === "walk") {
        var dir = target > x ? 1 : -1;
        el.classList.toggle("left", dir < 0);
        x += dir * speed * dt;
        if ((dir > 0 && x >= target) || (dir < 0 && x <= target)) { x = target; sit(rand(2, 5)); }
        else {
          acc += dt;
          if (acc > 0.18) { acc = 0; step = 1 - step; }
          setFrame(step ? "walkB" : "walkA");
        }
      } else if (state === "sit") {
        timer -= dt;
        if (timer <= 0) {
          if (Math.random() < 0.25) { state = "sleep"; timer = rand(8, 14); setFrame("sleep"); }
          else {
            var tx = rand(0, maxX());
            if (Math.abs(tx - x) < 80) tx = x < maxX() / 2 ? maxX() : 0;
            walkTo(tx, 45);
          }
        }
      } else {
        timer -= dt;
        if (timer <= 0) sit(1.5);
      }
      place();
    }
    function tick(t) {
      var dt = Math.min(0.1, (t - last) / 1000 || 0);
      last = t;
      update(dt);
      raf = requestAnimationFrame(tick);
    }

    function onMove(e) {
      if (reduce || state === "sleep") return;
      if (e.clientY > window.innerHeight - 180) walkTo(e.clientX - W / 2, 110);
    }
    function onResize() { x = Math.min(x, maxX()); target = Math.min(target, maxX()); place(); }
    function pet() {
      if (state === "sleep") { sit(2); say("mrrp?"); }
      else say(LINES[Math.floor(Math.random() * LINES.length)]);
      hop();
      place();
    }
    btn.addEventListener("click", pet);
    document.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);

    setFrame("sit");
    place();
    if (!reduce) raf = requestAnimationFrame(tick);

    cat = {
      say: say,
      pet: pet,
      remove: function () {
        cancelAnimationFrame(raf);
        document.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
        el.remove();
        cat = null;
      },
    };
  }

  /* ---------- mini terminal ---------- */
  var term = null;

  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function findProject(q) {
    q = slug(q);
    if (!q) return null;
    return list(d.projects).filter(function (p) { return slug(p.name) === q; })[0] ||
      list(d.projects).filter(function (p) { return slug(p.name).indexOf(q) === 0; })[0] || null;
  }
  function safeUrl(u) {
    try {
      var url = new URL(u, location.href);
      return /^(https?:|mailto:)$/.test(url.protocol) ? url.href : "";
    } catch (e) { return ""; }
  }
  function openLink(u) {
    var href = safeUrl(u);
    if (!href) return false;
    if (/^mailto:/.test(href)) location.href = href;
    else window.open(href, "_blank", "noopener");
    return true;
  }

  var PAGES = ["home", "experience", "projects", "about"];
  function hashPage() {
    var m = String(location.hash || "").replace(/^#\/?/, "").split(/[/?]/)[0].toLowerCase();
    return PAGES.indexOf(m) > -1 ? m : "home";
  }
  var COMMANDS = ["help", "whoami", "now", "cd", "ls", "cat", "open", "projects", "experience", "skills", "contact", "pet", "meow", "echo", "date", "pwd", "clear", "exit"];

  function mountTerm() {
    if (term) return;
    var btn = document.createElement("button");
    btn.id = "px-term-btn";
    btn.type = "button";
    btn.title = "Open terminal (press `)";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "px-term");
    btn.innerHTML = '<span aria-hidden="true">&gt;_</span><b>terminal</b>';

    var box = document.createElement("div");
    box.id = "px-term";
    box.hidden = true;
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", "Mini terminal");
    var ps1 = first + "@portfolio:~$";
    box.innerHTML = '<div class="px-bar"><i></i><i></i><i></i><span></span><button type="button" class="px-x" aria-label="Close terminal">×</button></div>' +
      '<div class="px-out" role="log" aria-live="polite"></div>' +
      '<form class="px-in"><label class="px-ps1" for="px-cmd"></label>' +
      '<input id="px-cmd" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"></form>';
    document.body.appendChild(btn);
    document.body.appendChild(box);
    box.querySelector(".px-bar span").textContent = ps1;
    box.querySelector(".px-ps1").textContent = ps1;

    var out = box.querySelector(".px-out"), input = box.querySelector("#px-cmd"), form = box.querySelector("form");
    var history = [], hi = 0, welcomed = false;

    function print(text, cls) {
      String(text).split("\n").forEach(function (line) {
        var row = document.createElement("div");
        if (cls) row.className = cls;
        row.textContent = line;
        out.appendChild(row);
      });
      out.scrollTop = out.scrollHeight;
    }
    function contact() {
      var lines = [];
      if (d.email) lines.push("email     " + d.email);
      list(d.links).forEach(function (l) { lines.push((l.label.toLowerCase() + "         ").slice(0, 10) + l.url); });
      return lines.join("\n") || "nothing here yet";
    }
    function projectText(p) {
      return [p.name + (p.when ? "  (" + p.when + ")" : ""), list(p.stack).length ? "stack: " + p.stack.join(", ") : "", p.summary, p.result ? "-> " + p.result : "", p.url || ""]
        .filter(Boolean).join("\n");
    }
    function skillsText() {
      return list(d.skills).map(function (s) { return (s.group.toLowerCase() + ":          ").slice(0, 12) + list(s.items).join(", "); }).join("\n");
    }
    function experienceText() {
      return list(d.experience).map(function (j) { return j.role + " @ " + j.org + "  (" + j.dates + ")\n  " + j.summary; }).join("\n\n");
    }
    function projectsText() {
      return list(d.projects).map(function (p) { return p.name + "  (" + p.when + ")\n  " + p.summary; }).join("\n\n");
    }
    function bare(a) { return String(a || "").replace(/^\.\//, "").replace(/^projects\//, "").replace(/\/$/, ""); }

    var HELP = "commands:\n" +
      "  whoami            who I am\n" +
      "  now               what I'm up to lately\n" +
      "  cd <page>         go to home, experience, projects or about\n" +
      "  ls [dir]          list pages, or what's inside one\n" +
      "  cat <file>        about.txt, contact.txt, or a project name\n" +
      "  open <name>       linkedin, github, email, resume or a project\n" +
      "  projects          what I've built\n" +
      "  experience        where I've worked\n" +
      "  skills            what I use\n" +
      "  contact           how to reach me\n" +
      "  pet               pet the cat\n" +
      "  clear / exit      tidy up or close\n" +
      "psst: there are a few hidden ones.";

    function run(line) {
      var raw = line.trim();
      if (!raw) return;
      var row = document.createElement("div");
      row.className = "cmd";
      var b = document.createElement("b");
      b.textContent = ps1 + " ";
      row.appendChild(b);
      row.appendChild(document.createTextNode(raw));
      out.appendChild(row);

      var parts = raw.split(/\s+/), cmd = parts[0].toLowerCase(), args = parts.slice(1), a0 = bare(args[0]).toLowerCase();

      switch (cmd) {
        case "help": case "?": print(HELP); break;
        case "whoami": print([d.name, d.headline, d.school, d.location].filter(Boolean).join("\n")); break;
        case "now": print(list(d.now).map(function (n) { return (n.label + ":          ").slice(0, 11) + n.text; }).join("\n") || "nothing yet"); break;
        case "ls":
          if (!a0) print("home/  experience/  projects/  about/  skills/  contact.txt" + (d.resume ? "  resume.pdf" : ""));
          else if (a0 === "about") print("about.txt");
          else if (a0 === "projects") print(list(d.projects).map(function (p) { return slug(p.name); }).join("  ") || "(empty)");
          else if (a0 === "experience") print(list(d.experience).map(function (j) { return slug(j.org); }).join("  ") || "(empty)");
          else if (a0 === "skills") print(list(d.skills).map(function (s) { return slug(s.group); }).join("  ") || "(empty)");
          else print("ls: cannot access '" + args[0] + "': No such file or directory", "err");
          break;
        case "cat": {
          if (!a0) { print("meow. (did you mean: cat <file>?)"); if (cat) cat.say("meow!"); break; }
          var p = findProject(a0);
          if (a0 === "about" || a0 === "about.txt") print(d.about || "");
          else if (a0 === "contact" || a0 === "contact.txt") print(contact());
          else if (a0 === "skills") print(skillsText());
          else if (a0 === "resume.pdf" || a0 === "resume") print(d.resume ? "cat: resume.pdf: binary file (try 'open resume')" : "cat: resume.pdf: No such file or directory", "err");
          else if (p) print(projectText(p));
          else print("cat: " + args[0] + ": No such file or directory", "err");
          break;
        }
        case "open": {
          if (!a0) { print("usage: open <linkedin | github | email | resume | project>", "err"); break; }
          var link = list(d.links).filter(function (l) { return l.label.toLowerCase() === a0; })[0];
          var proj = findProject(a0);
          var ok = false;
          if (link) ok = openLink(link.url);
          else if ((a0 === "email" || a0 === "mail") && d.email) ok = openLink("mailto:" + d.email);
          else if (a0 === "resume" && d.resume) ok = openLink(d.resume);
          else if (proj && proj.url) ok = openLink(proj.url);
          else if (proj) { print(proj.name + " doesn't have a link yet."); break; }
          print(ok ? "opening " + a0 + "..." : "open: don't know '" + args[0] + "'. try: linkedin, github, email", ok ? "dim" : "err");
          break;
        }
        case "projects": print(projectsText() || "(empty)"); break;
        case "experience": print(experienceText() || "(empty)"); break;
        case "skills": print(skillsText() || "(empty)"); break;
        case "contact": print(contact()); break;
        case "pet":
          if (cat) { cat.pet(); print("purr~"); } else print("there's no cat here.", "err");
          break;
        case "meow": print("meow."); if (cat) cat.say("meow!"); break;
        case "echo": print(args.join(" ")); break;
        case "date": print(new Date().toString()); break;
        case "pwd": print("/home/" + first + "/portfolio/" + hashPage()); break;
        case "cd": {
          var dest = a0 || "home";
          if (dest === "~" || dest === "." || dest === ".." || dest === "/") dest = "home";
          if (PAGES.indexOf(dest) === -1) { print("cd: no such page: " + (args[0] || "") + ". try: " + PAGES.join(", "), "err"); break; }
          if (dest === hashPage()) { print("already in " + dest, "dim"); break; }
          location.hash = "#/" + (dest === "home" ? "" : dest);
          print("-> " + dest, "dim");
          break;
        }
        case "clear": out.textContent = ""; break;
        case "exit": case "quit": case "close": close(); break;
        case "sudo":
          if (/^sudo\s+hire\b/i.test(raw)) {
            print("[sudo] password for recruiter: ********\naccess granted.\n✓ " + first + " has been hired.\noffer letter sent to /dev/null (kidding, email me" + (d.email ? ": " + d.email : "") + ")");
            if (cat) cat.say("congrats!");
          } else print("recruiter is not in the sudoers file. This incident will be reported.", "err");
          break;
        case "rm": print("nice try. the cat has claws.", "err"); if (cat) cat.say("hiss"); break;
        case "vim": case "nano": case "emacs": print("you're stuck in " + cmd + " now. (just kidding, type 'exit')"); break;
        default: print("command not found: " + parts[0] + ". try 'help'", "err");
      }
      out.scrollTop = out.scrollHeight;
    }

    function complete() {
      var v = input.value, m = v.match(/^(\S+)\s+(\S*)$/), pool, prefix, head = "";
      if (m) {
        head = m[1] + " ";
        prefix = m[2].toLowerCase();
        var c = m[1].toLowerCase();
        if (c === "cat") pool = ["about.txt", "contact.txt"].concat(list(d.projects).map(function (p) { return slug(p.name); }));
        else if (c === "ls") pool = ["about", "experience", "projects", "skills"];
        else if (c === "cd") pool = PAGES;
        else if (c === "open") pool = list(d.links).map(function (l) { return l.label.toLowerCase(); }).concat(["email", "resume"], list(d.projects).map(function (p) { return slug(p.name); }));
        else return;
      } else if (/^\S*$/.test(v)) { prefix = v.toLowerCase(); pool = COMMANDS; }
      else return;
      var hits = pool.filter(function (w) { return w.indexOf(prefix) === 0; });
      if (hits.length === 1) input.value = head + hits[0] + " ";
      else if (hits.length > 1) print(hits.join("  "), "dim");
    }

    function open() {
      box.hidden = false;
      btn.setAttribute("aria-expanded", "true");
      if (!welcomed) {
        welcomed = true;
        print("welcome to " + first + "'s terminal. type 'help' to get started.", "dim");
      }
      input.focus();
    }
    function close() {
      var hadFocus = box.contains(document.activeElement);
      box.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      if (hadFocus) btn.focus();
    }
    function toggle() { if (box.hidden) open(); else close(); }

    btn.addEventListener("click", toggle);
    box.querySelector(".px-x").addEventListener("click", close);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = input.value;
      input.value = "";
      if (v.trim()) { history.push(v); hi = history.length; }
      run(v);
    });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowUp") { if (hi > 0) { hi--; input.value = history[hi]; } e.preventDefault(); }
      else if (e.key === "ArrowDown") { hi = Math.min(history.length, hi + 1); input.value = history[hi] || ""; e.preventDefault(); }
      else if (e.key === "Tab") { e.preventDefault(); complete(); }
      else if (e.key === "l" && e.ctrlKey) { e.preventDefault(); out.textContent = ""; }
    });

    term = {
      box: box,
      toggle: toggle,
      close: close,
      remove: function () { btn.remove(); box.remove(); term = null; },
    };
  }

  // one global key handler: ` toggles the terminal, Esc closes it
  document.addEventListener("keydown", function (e) {
    if (!term) return;
    if (e.key === "Escape" && !term.box.hidden) { term.close(); return; }
    if (e.key !== "`" || e.metaKey || e.ctrlKey || e.altKey) return;
    var t = e.target, tag = t && t.tagName;
    var typing = tag === "TEXTAREA" || (tag === "INPUT" && t.id !== "px-cmd") || (t && t.isContentEditable);
    if (typing) return;
    e.preventDefault();
    term.toggle();
  });

  /* ---------- Vision Pro startup ---------- */
  // A pixel visor frame opens like a headset powering on, says hello, then the frame flies past the
  // edges of the screen and fades away. Plays on every load; any click or key skips it.
  var GLYPH = {
    h: ["X....", "X....", "X.XX.", "XX..X", "X...X", "X...X", "X...X"],
    e: [".....", ".....", ".XXX.", "X...X", "XXXXX", "X....", ".XXX."],
    l: ["XX...", ".X...", ".X...", ".X...", ".X...", ".X...", ".XX.."],
    o: [".....", ".....", ".XXX.", "X...X", "X...X", "X...X", ".XXX."],
  };
  function ease(u) { u = Math.max(0, Math.min(1, u)); return 1 - Math.pow(1 - u, 3); }
  function easeIn(u) { u = Math.max(0, Math.min(1, u)); return u * u * u; }

  function boot(reveal) {
    if (reduce || document.hidden || !on("boot")) return false; // background tabs would freeze the animation

    var W = window.innerWidth, H = window.innerHeight, dpr = Math.min(2, window.devicePixelRatio || 1);
    var cv = document.createElement("canvas");
    cv.id = "px-boot";
    cv.setAttribute("aria-hidden", "true");
    cv.style.cssText = "position:fixed;left:0;top:0;width:" + W + "px;height:" + H + "px;z-index:300;pointer-events:none";
    cv.width = W * dpr;
    cv.height = H * dpr;
    document.body.appendChild(cv);
    var ctx = cv.getContext("2d");
    ctx.scale(dpr, dpr);

    var P = W < 600 ? 6 : 10, cols = Math.ceil(W / P), rows = Math.ceil(H / P);
    var cx = W / 2, cy = H / 2, hw = W * 0.44, hh = Math.min(H * 0.36, hw * 0.62);
    var BLACK = "#10060D", RING = ["#F3A8C6", "#C2467F", "#8E2F5C", "#4A1730"];
    var END = 2500, REVEAL = 1450, revealed = false, over = false, raf = 0;

    function cell(px, py, ax, ay, glow) {
      var nx = (px - cx) / ax, ny = (py - cy) / ay;
      var v = nx * nx * nx * nx + ny * ny * ny * ny;
      if (v <= 1) {
        if (nx > -0.17 && nx < 0.17 && ny > 0.7 + 5 * nx * nx) return RING[1]; // rounded nose bridge
        var a = Math.round(glow * (1 - 0.5 * v) * 5) / 5;
        return a > 0 ? "rgba(255,228,241," + a + ")" : null;
      }
      return v <= 1.06 ? RING[0] : v <= 1.16 ? RING[1] : v <= 1.3 ? RING[2] : v <= 1.5 ? RING[3] : BLACK;
    }
    function drawHello(alpha) {
      if (alpha <= 0) return;
      var dot = P * (W < 600 ? 1 : 2), word = "hello", adv = 6 * dot;
      var x0 = cx - (word.length * adv - dot) / 2, y0 = cy - 3.5 * dot;
      ctx.globalAlpha = alpha;
      [[dot / 2, dot / 2, "#F6B9D1"], [0, 0, "#C2467F"]].forEach(function (pass) {
        ctx.fillStyle = pass[2];
        word.split("").forEach(function (ch, i) {
          GLYPH[ch].forEach(function (row, ry) {
            for (var rx = 0; rx < 5; rx++) {
              if (row[rx] === "X") ctx.fillRect(x0 + i * adv + rx * dot + pass[0], y0 + ry * dot + pass[1], dot, dot);
            }
          });
        });
      });
      ctx.globalAlpha = 1;
    }
    function frame(t) {
      // timeline (ms): black -> lens opens -> glow fades into the page -> hello -> frame flies off and fades
      var sx = 0.25, sy = t < 300 ? 0.0005 : 0.03, glow = 1, zoom = 1, hello = 0, fade = 1;
      if (t >= 400) {
        var u = (t - 400) / 750;
        sx = 0.25 + 0.75 * ease(u);
        sy = 0.03 + 0.97 * ease(u * u);
      }
      if (t >= 1150) { sx = sy = 1; glow = 1 - ease((t - 1150) / 650); }
      if (t >= 1300) hello = ease((t - 1300) / 250) - ease((t - 1950) / 250);
      if (t >= 1800) zoom = 1 + 2.4 * easeIn((t - 1800) / 700);
      if (t >= 2250) fade = 1 - (t - 2250) / (END - 2250);
      if (!revealed && t >= REVEAL) { revealed = true; reveal(); }

      ctx.clearRect(0, 0, W, H);
      var ax = hw * sx * zoom, ay = hh * sy * zoom;
      for (var y = 0; y < rows; y++) {
        var run = null, start = 0, py = y * P + P / 2;
        for (var x = 0; x <= cols; x++) {
          var c = x < cols ? cell(x * P + P / 2, py, ax, ay, glow) : null;
          if (x === cols || c !== run) {
            if (run) { ctx.fillStyle = run; ctx.fillRect(start * P, y * P, (x - start) * P, P); }
            run = c;
            start = x;
          }
        }
      }
      drawHello(hello);
      cv.style.opacity = Math.max(0, fade);
    }
    function end() {
      if (over) return;
      over = true;
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", skip);
      document.removeEventListener("pointerdown", skip);
      window.removeEventListener("resize", skip);
      cv.remove();
    }
    function skip() {
      if (!revealed) { revealed = true; reveal(); }
      end();
    }
    var t0 = performance.now();
    function tick(now) {
      if (over) return;
      var t = now - t0;
      if (t >= END) { if (!revealed) { revealed = true; reveal(); } end(); return; }
      frame(t);
      raf = requestAnimationFrame(tick);
    }
    document.addEventListener("keydown", skip);
    document.addEventListener("pointerdown", skip);
    window.addEventListener("resize", skip);
    frame(0);
    raf = requestAnimationFrame(tick);
    return true;
  }

  /* ---------- wire up ---------- */
  // pages swap without a reload: re-decorate the new content, and let the cat react
  var CAT_ROUTE = { home: "welcome back", experience: "apple intern!", projects: "fresh plans!", about: "that's mia", notfound: "where'd it go?" };
  window.addEventListener("pf:route", function (e) {
    if (document.documentElement.getAttribute("data-style") !== "terminal") return;
    logos();
    var line = CAT_ROUTE[e.detail && e.detail.route];
    if (cat && line) setTimeout(function () { if (cat) cat.say(line); }, 350);
  });
  window.addEventListener("pf:say", function (e) { if (cat) cat.say(String(e.detail)); });

  var firstRun = true;
  function apply() {
    var style = document.documentElement.getAttribute("data-style");
    var booting = document.documentElement.classList;
    if (style !== "terminal") {
      booting.remove("px-booting");
      firstRun = false;
      var sp = document.getElementById("px-spirals");
      if (sp) sp.remove();
      if (cat) cat.remove();
      if (term) term.remove();
      return;
    }
    addStyles();
    if (on("pixels")) pixels();
    logos();
    spirals();
    if (on("cat")) mountCat();
    if (on("terminal")) mountTerm();
    // on the first load the intro waits for the startup animation to reach its reveal moment
    var play = firstRun && boot(function () { intro(); booting.remove("px-booting"); });
    firstRun = false;
    if (!play) { intro(); booting.remove("px-booting"); }
  }
  new MutationObserver(apply).observe(document.documentElement, { attributes: true, attributeFilter: ["data-style"] });
  apply();
})();
