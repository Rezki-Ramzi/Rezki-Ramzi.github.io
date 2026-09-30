# ramzi-rezki.github.io

Personal academic website — pure HTML/CSS/JS, no build step.

## Publish on GitHub Pages
1. Create a **public** repository named exactly `<your-github-username>.github.io`.
2. Upload the contents of this folder (keep the structure) to the `main` branch.
3. Repository → **Settings → Pages** → Source: *Deploy from a branch* → `main` / `(root)` → Save.
4. After ~1 minute the site is live at `https://<your-github-username>.github.io`.

## Update the content
All text lives in **`assets/js/data.js`** — search for `TODO`.

| What | Where |
|---|---|
| Publications (title, venue, PDF, GitHub code, DOI) | `PUBLICATIONS` in `data.js`; put PDFs in `assets/papers/` |
| CV entries, skills, languages | `CV` in `data.js`; put your CV at `assets/cv/Ramzi_Rezki_CV.pdf` |
| Course PDFs (HTML/CSS, Networks) | drop files in `courses/html-css/` or `courses/networks/`, then add one line per file in `COURSES` |
| Certifications & achievements | `ACHIEVEMENTS` in `data.js` |
| LinkedIn / GitHub links | `SITE.links` in `data.js` |

Example course entry:
```js
{ name: "Exam 2025 — with solutions", file: "courses/networks/exam-2025.pdf", type: "exam" },
```
`type` can be `lecture`, `lab`, `exam` or `solution` — filter tabs appear automatically.

## Contact form
Messages are delivered to `ramzi.rezki@lecnam.net` through [FormSubmit](https://formsubmit.co) (free, no account).
**The very first message** triggers an activation email from FormSubmit — click the link in it once, and all later messages arrive normally.
If the service is unreachable, visitors get a one-click fallback that opens their email app.
