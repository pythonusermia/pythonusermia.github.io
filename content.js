/* =====================================================================
   YOUR PORTFOLIO CONTENT
   This is the only file you need to edit.
   Change the text between the quotes "like this", save, and refresh.
   Every style (theme) reads from this file, so you only fill it in once.
   ===================================================================== */

window.PORTFOLIO = {

  /* ---------- STYLE ----------
     Pick your look: "terminal", "clean", or "story".
     showThemePicker: true shows the style switcher in the corner.
     Set it to false once you've picked your favorite.            */
  theme: "terminal",
  showThemePicker: true,

  /* ---------- FUN EXTRAS (Terminal style only) ----------
     Set any of these to false to turn it off.                     */
  extras: {
    words: ["Software Engineer", "CS Student", "Apple Intern"],   // flashed in place of your name during the typing intro
    boot: true,       // Vision Pro startup animation on every page load (any click or key skips it)
    typing: true,     // the prompt, your name (typed, deleted, retyped) and school line type out on load
    cat: true,        // a pixel cat wandering along the bottom of the page
    terminal: true,   // click ">_ terminal" or press ` for a mini command line
    spirals: true,    // pixel spiral flourish in the left margin (wide screens only)
    pixels: true,     // pixel favicon and footer heart
    avatar: true,     // pixel Vision Pro profile picture (only if you haven't set a photo)
    logos: true,      // company logo next to matching experience entries (Apple)
  },

  /* ---------- ABOUT YOU ---------- */
  name: "Mia Yonker",
  initials: "MY",                       // shown if you don't add a photo
  photo: "",                            // optional: "images/headshot.jpg"
  headline: "Computer science student building apps for iOS, visionOS, and the web.",
  tagline: "I like turning emerging tech into things people can actually use.",   // used by the Story style
  school: "CS at UT Austin, class of 2029",
  location: "Austin, TX",
  status: "",                           // leave "" to hide

  about: "I'm a Computer Science major at UT Austin with a minor in Statistics and Data Science. I build Swift and TypeScript apps, from a meal planner to an iOS Braille learning app, and this past summer I interned on Apple's Vision Pro team, prototyping new experiences.",

  /* ---------- NOW ----------
     A little "what I'm up to" box in the sidebar. Edit the text
     or add/remove lines. Use [] to hide the box.                  */
  now: [
    { label: "building",  text: "a PiPod" },
    { label: "learning",  text: "React Native" },
    { label: "listening", text: "Just Like Heaven by The Cure" },
  ],

  /* ---------- CONTACT ---------- */
  email: "miay@cs.utexas.edu",
  resume: "",                           // upload your resume as resume.pdf, then set this to "resume.pdf"
  links: [
    { label: "LinkedIn", url: "https://linkedin.com/in/miayonker" },
    { label: "GitHub",   url: "https://github.com/pythonusermia" },
  ],

  /* ---------- EXPERIENCE ----------
     Newest first. Copy a { ... }, block to add another.
     Jobs, internships, research, org leadership, and your own
     business all count.                                           */
  experience: [
    {
      role: "SWE Intern",
      org: "Apple – Vision Pro Group",
      place: "",
      dates: "Summer 2026",
      summary: "Rapidly prototyped user-focused experiences exploring intelligence, augmented reality, and ambient computing, then presented demos to cross-functional partners and leadership.",
      tags: ["Swift", "ARKit", "visionOS"],
      /* Optional: add photos and the card gets a "flip for photos" button. */
      photos: [
        { src: "images/apple-interns.jpg", caption: "intern crew", alt: "Apple interns posing in front of a vintage van with Apple 26 signs" },
        { src: "images/apple-lunch.jpg", caption: "team lunch", alt: "A team lunch around a long table at a restaurant" },
        { src: "images/apple-rainbow.jpg", caption: "rainbow at the park", alt: "Interns lying on the grass in front of the big rainbow sculpture at Apple Park" },
      ],
    },
    {
      role: "Secretary, Executive Board",
      org: "UT SHPE",
      place: "Austin, TX",
      dates: "Fall 2025 – now",
      summary: "Use data-driven analysis to improve the member experience year-round, build internal tools for the leadership team, and work toward chapter recognition from SHPE National.",
      tags: [],
    },
    {
      role: "Engineering Division",
      org: "Texas Blockchain",
      place: "Austin, TX",
      dates: "Fall 2025 – now",
      summary: "Built a Python P2P Trading Optimizer that uses the Jupiter DeFi API to analyze token swap routes on Solana, with mock data pipelines for offline testing and ML route prediction.",
      tags: ["Python", "Solana", "Machine Learning"],
    },
  ],

  /* ---------- PROJECTS ----------
     2 to 4 projects works best. Class projects count!
     "result" is one line about what happened or what you learned.
     "url" can link to a demo, GitHub repo, or photos ("" for none). */
  projects: [
    {
      name: "Fresh Plans",
      when: "Fall 2025 – Spring 2026",
      stack: ["Swift", "Xcode"],
      summary: "A full-stack meal planning app that uses a custom algorithm to generate personalized meal plans and grocery lists.",
      result: "Handles data parsing, saved preferences, and state management end to end",
      url: "",
    },
    {
      name: "ReRoom",
      when: "Summer – Fall 2025",
      stack: ["TypeScript", "Computer Vision"],
      summary: "An AI-powered spatial organization app that analyzes room layouts with computer vision and recommends how to optimize them.",
      result: "Combines image recognition APIs, 3D mapping, and automated recommendations",
      url: "",
    },
    {
      name: "Radix",
      when: "Winter 2024 – Fall 2025",
      stack: ["Swift", "Core Haptics", "Xcode"],
      summary: "An iOS Braille learning app that simulates tactile feedback for visually impaired users.",
      result: "Uses Core Haptics to make Braille learnable by touch",
      url: "",
    },
  ],

  /* ---------- SKILLS ----------
     Group them however makes sense for your major.               */
  skills: [
    { group: "Languages",  items: ["Java", "Python", "R", "Swift", "TypeScript"] },
    { group: "Tools",      items: ["Xcode", "Git", "GitHub", "Visual Studio Code", "PyCharm", "RStudio", "Eclipse", "n8n"] },
    { group: "Platforms",  items: ["iOS", "macOS", "visionOS"] },
  ],

  /* ---------- AWARDS (optional, use [] for none) ---------- */
  awards: ["Hispanic Scholarship Fund Scholar (2025, 2026)", "Girls Who Code SSP"],
};
