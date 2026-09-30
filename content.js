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
  showThemePicker: false,

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
      /* featured: true makes it the big hero on the Projects page (and a tile on Home). */
      featured: true,
      highlights: [
        "Built a full-stack meal planning app in Xcode with Swift, using a custom algorithm to generate personalized meal plans and grocery lists.",
        "Implemented data parsing, user preference storage, and state management for a seamless interactive experience.",
      ],
      screens: [
        { src: "images/fresh-plans-today.jpg", caption: "today", alt: "Fresh Plans home screen with a weekly meal progress bar and a calendar" },
        { src: "images/fresh-plans-plan.jpg", caption: "make a plan", alt: "Plan setup screen: choose the number of days, meal types, and ingredients to use up" },
        { src: "images/fresh-plans-weekly.jpg", caption: "weekly plan", alt: "A generated weekly plan with lockable meals and a regenerate button" },
        { src: "images/fresh-plans-groceries.jpg", caption: "groceries", alt: "A grocery list grouped by category with checkboxes" },
        { src: "images/fresh-plans-recipe.jpg", caption: "recipes", alt: "A recipe page with a star rating and notes" },
        { src: "images/fresh-plans-recipe-box.jpg", caption: "recipe box", alt: "The recipe box with search and saved folders" },
        { src: "images/fresh-plans-folders.jpg", caption: "folders", alt: "The add-to-saved sheet for choosing recipe folders" },
      ],
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

  /* ---------- EDUCATION (shown on the About page) ---------- */
  education: [
    {
      school: "University of Texas at Austin",
      degree: "B.S. Computer Science",
      minor: "Minor in Statistics and Data Science",
      when: "Class of 2029",
      coursework: ["Data Structures", "Discrete Math", "Integral & Multivariable Calculus", "Elements of Statistics"],
      involvement: ["HACS", "WiCS"],   // shown as "also involved in"; SHPE and Blockchain have their own sections below
    },
  ],

  /* ---------- INVOLVEMENT (a section on the Experience page for each) ----------
     An organization listed here replaces its plain entry in EXPERIENCE above (matched by org name).
     Add "photos" for a pile of polaroids, "stats" for the big numbers.
     "pos" on a photo chooses which part of it stays in view, like "50% 20%". */
  involvement: [
    {
      org: "Apple – Vision Pro Group",   // must match the org in EXPERIENCE so it replaces that plain entry
      id: "apple",
      role: "SWE Intern",
      when: "Summer 2026",
      tone: "green",
      blurb: "I spent the summer prototyping new experiences for Apple's Vision Pro group.",
      highlights: [
        "Rapidly developed user-focused prototypes exploring emerging technologies, including intelligence, augmented reality, and ambient computing.",
        "Built interactive experiences using Swift, ARKit, and other tools to communicate product concepts and inform cross-functional decision-making.",
        "Presented prototypes and demos to cross-functional partners and leadership, translating user insights to help them feel and understand concepts more deeply.",
        "Collaborated cross-functionally to define and communicate key capabilities of future products and technologies.",
      ],
      tags: ["Swift", "ARKit", "visionOS"],
      photos: [
        { src: "images/apple-interns.jpg", caption: "intern crew", alt: "Apple interns posing in front of a vintage van with Apple 26 signs" },
        { src: "images/apple-lunch.jpg", caption: "team lunch", alt: "A team lunch around a long table at a restaurant" },
        { src: "images/apple-rainbow.jpg", caption: "rainbow at the park", alt: "Interns lying on the grass in front of the big rainbow sculpture at Apple Park" },
      ],
    },
    {
      org: "UT SHPE",
      role: "Secretary, Executive Board",
      when: "Fall 2025 – now",
      tone: "blue",
      blurb: "I manage a 48-person leadership team in an organization of more than 450 members.",
      stats: [
        { value: "48", label: "person leadership team" },
        { value: "450+", label: "members in the org" },
      ],
      highlights: [
        "Use data-driven analysis to give organization-wide feedback and build a better experience for members year-round.",
        "Create internal tools for the leadership team to increase efficiency and free up our leaders to connect with members.",
        "Develop and carry out strategies to earn external chapter recognition from SHPE National.",
      ],
      photos: [
        { src: "images/shpe-officers.jpg", caption: "hook 'em", alt: "Five people in SHPE polos making the Hook 'em Horns hand sign in a bright atrium" },
        { src: "images/shpe-bienvenida.jpg", caption: "bienvenida", alt: "Two people holding hand-decorated welcome signs that say A la SHPE familia" },
        { src: "images/shpe-portrait.jpg", caption: "shpe polo", pos: "50% 22%", alt: "A smiling person with curly hair in a black SHPE polo" },
        { src: "images/shpe-lights.jpg", caption: "holiday lights", alt: "Three friends smiling together at a holiday lights display at night" },
        { src: "images/shpe-night-out.jpg", caption: "night out", alt: "A group posing in a line outside a shop at night, their arms making shapes" },
      ],
    },
    {
      org: "Texas Blockchain",
      role: "Engineering Division",
      when: "Fall 2025 – now",
      tone: "green",
      blurb: "Built a Python P2P Trading Optimizer that plugs into the Jupiter DeFi API to analyze token swap routes on the Solana blockchain.",
      highlights: [
        "Used mock data pipelines so the optimizer can be tested offline.",
        "Added machine learning route prediction to pick better swap routes.",
      ],
      tags: ["Python", "Solana", "Jupiter DeFi API", "Machine Learning"],
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
