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
  theme: "clean",
  showThemePicker: true,

  /* ---------- ABOUT YOU ---------- */
  name: "Anthony Cardozo",
  initials: "AC",                       // shown if you don't add a photo
  photo: "",                            // optional: "images/headshot.jpg"
  headline: "Software engineer building cloud systems and developer tools.",
  tagline: "I like building things people actually use.",   // used by the Story style
  school: "CS at UT Austin, class of 2029",
  location: "Austin, TX",
  status: "Looking for Summer 2027 internships",             // leave "" to hide

  about: "I've worked on AI evaluation at AWS, a browser-based compiler at a startup, and the platform my SHPE chapter runs on. Before all that, I built an online store for my family's candy business.",

  /* ---------- CONTACT ---------- */
  email: "anthonycardozo06@gmail.com",
  resume: "resume.pdf",                 // upload your resume with this exact name, or "" to hide
  links: [
    { label: "LinkedIn", url: "https://linkedin.com/in/anthony-cardozo-4361b6310" },
    { label: "GitHub",   url: "https://github.com/your-username" },
  ],

  /* ---------- EXPERIENCE ----------
     Newest first. Copy a { ... }, block to add another.
     Jobs, internships, research, org leadership, and your own
     business all count.                                           */
  experience: [
    {
      role: "Software Engineering Intern",
      org: "Amazon Web Services",
      place: "Seattle, WA",
      dates: "Summer 2026",
      summary: "Built a weekly pipeline that grades an AI root-cause-analysis agent and found fixes that raised its average score 23%.",
      tags: ["Lambda", "SQS", "Bedrock", "DynamoDB"],
    },
    {
      role: "Founding Engineer",
      org: "One Dollar Computer",
      place: "Austin, TX",
      dates: "2026 – now",
      summary: "Built the cloud compiler that lets you write C or Rust in the browser and flash a RISC-V board in under 6 seconds.",
      tags: ["C", "Rust", "GCP", "WebHID"],
    },
    {
      role: "Website Lead",
      org: "SHPE UT Austin",
      place: "Austin, TX",
      dates: "2026 – now",
      summary: "Lead the platform 400+ members use to earn points for convention and stipends. 1,000+ check-ins in the first 3 weeks.",
      tags: ["React", "Supabase"],
    },
    {
      role: "Founder",
      org: "Cardozo Enchilados",
      place: "Dallas, TX",
      dates: "2023 – now",
      summary: "Run a Mexican candy business with my family: 1,500+ units sold, plus a Stripe storefront that replaced taking orders over DMs.",
      tags: ["React", "Express", "MongoDB", "Stripe"],
    },
  ],

  /* ---------- PROJECTS ----------
     2 to 4 projects works best. Class projects count!
     "result" is one line about what happened or what you learned.
     "url" can link to a demo, GitHub repo, or photos ("" for none). */
  projects: [
    {
      name: "HONK",
      when: "Hackathon · Apr 2026",
      stack: ["Next.js", "Gemini", "Firebase"],
      summary: "A focus app that checks your screen every minute. Drift off task and it honks at you and takes your bread.",
      result: "Distracted time dropped from 33% to 8%",
      url: "",
    },
    {
      name: "Landing Pad",
      when: "Hackathon · Jul 2026",
      stack: ["React", "TypeScript", "AWS CDK"],
      summary: "A no-login city guide where outgoing interns pass down their favorite food, housing, and activity spots to the next class.",
      result: "54 places on a color-coded map",
      url: "",
    },
    {
      name: "SHPE Chapter Platform",
      when: "SHPE · 2026",
      stack: ["React", "Supabase"],
      summary: "Event check-ins, a points leaderboard, and an officer dashboard for our chapter.",
      result: "1,000+ check-ins in 3 weeks",
      url: "",
    },
  ],

  /* ---------- SKILLS ----------
     Group them however makes sense for your major.               */
  skills: [
    { group: "Languages",  items: ["Java", "C", "Python", "JavaScript", "TypeScript", "x86 Assembly"] },
    { group: "Frameworks", items: ["React", "Next.js", "Node", "Express", "Supabase", "Firebase"] },
    { group: "Cloud",      items: ["AWS Lambda", "S3", "SQS", "DynamoDB", "Bedrock", "CDK"] },
  ],

  /* ---------- AWARDS (optional, use [] for none) ---------- */
  awards: ["Amazon Future Engineer Scholar", "Dijkstra Scholar", "HITEC Scholar", "HSF Scholar"],
};
