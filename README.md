# Personal Portfolio Workshop · SHPE UT Austin

Build and publish your own portfolio site in one night. You fill in **one file**, pick a style, and it goes live at `yourusername.github.io`.

## 1. Make your copy
1. Click **Use this template → Create a new repository** (top right of this page).
2. Name it exactly **`yourusername.github.io`** (your real GitHub username) and set it to **Public**.

## 2. Open it in Codespaces
1. In your new repo, click **Code → Codespaces → Create codespace on main**.
2. Wait about a minute. VS Code opens in your browser with `content.js` already open, and a preview of your site opens on the side.
   - No preview? Open the **Ports** tab at the bottom and click the globe icon next to port 8000.

## 3. Fill in `content.js`
- Replace the sample text with your own, keeping the quotes and commas.
- Save (Ctrl/Cmd + S) and refresh the preview to see your changes.
- Stuck on what to write? Paste a resume bullet into Claude or ChatGPT and ask:
  > Ask me 3 questions about this, then write a 2-sentence project description for my portfolio. Make it sound like a student, not a press release.
- Something broke? The preview goes blank when a quote or comma is missing. Paste `content.js` into Claude or ChatGPT and ask it to find the mistake.

## 4. Pick your style
Use the **Style** switcher in the bottom-right corner to try **Terminal**, **Clean**, and **Story**. When you've picked one:
```js
theme: "story",
showThemePicker: false,
```

## 5. Publish
1. Click the **Source Control** icon on the left (the branch symbol), type a message like `my portfolio`, then click **Commit** and **Sync Changes**.
2. On GitHub, go to **Settings → Pages**, set the source to **Deploy from a branch → main → / (root)**, and click **Save**.
3. Wait 1–2 minutes, then open **`https://yourusername.github.io`**. You're live!

Page not loading? Check that your repo name exactly matches your username and that the repo is public.

## Optional extras
- **Photo:** upload `headshot.jpg` into `images/` and set `photo: "images/headshot.jpg"`.
- **Resume:** upload your resume as `resume.pdf` in the main folder.
- **Colors:** each style's colors are at the top of its file in `site/themes/` (look for `--accent`).
- **Done for the night?** Stop your Codespace (Code → Codespaces → … → Stop) so it doesn't use your free hours.

## What's in here
```
content.js          ← your info (the only file you need to edit)
index.html          ← the page shell
site/app.js         ← puts your content into the chosen style
site/themes/        ← terminal, clean, and story styles
images/             ← your photos
.devcontainer/      ← sets up Codespaces and the live preview
```
