# bornfromus.com - pre-launch site

Single-page static site for **Born From Us: AI Is the Mirror. The Decision Is Still Yours.**
by Ritesh Dogra & Priya Setty. Plain HTML/CSS/JS - no framework, no build step.

## Run it locally
Just open `index.html`, or serve the folder:
```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deploy
Upload the whole folder to any static host - Netlify, Vercel, GitHub Pages, Cloudflare Pages.
No configuration needed; `index.html` is the entry point.

## Files
```
index.html      all page content + section copy (verbatim from the brief)
styles.css      brand system, layout, responsive rules
script.js       nav, mobile menu, email-capture form
assets/
  cover.jpg               finished front cover (hero book image + alt OG)
  hero-hands.jpg          fingertip-touch photo (hero background)
  coming-soon.jpg         "Coming Soon" teaser (Open Graph / social share image)
  priya-setty-headshot.jpg  Priya's author photo
  favicon.svg             gold pill/capsule brand mark
```

## ⚠️ Placeholders to swap in before / at launch
Each is also flagged with a comment in the code - search for the word in the file listed.

| What | Where | Search for |
|---|---|---|
| **Email provider endpoint** - form is in demo mode (logs to console). | `script.js` (top) | `NEWSLETTER_ENDPOINT` |
| **Contact email** (`hello@bornfromus.com`) | `index.html` (footer) | `CONTACT EMAIL - PLACEHOLDER` |
| **Analytics** snippet (Plausible / GA4) | `index.html` (`<head>`) | `ANALYTICS PLACEHOLDER` |
| ISBN / retail links / release date | not on the page yet - the `#notify` list does this job for now | - |

### Wiring the email form (2-minute job)
1. Create a free account at **Buttondown** or **ConvertKit/Kit**.
2. Open `script.js`, set `NEWSLETTER_ENDPOINT` to your form endpoint and
   `NEWSLETTER_PROVIDER` to `"buttondown"` or `"convertkit"`.
3. Done - submissions now go to your list. No secret keys are needed client-side;
   never paste a secret API key into this file.

### Author headshots
Both are in place: `assets/ritesh-dogra-headshot.jpg` and
`assets/priya-setty-headshot.jpg` (centered 600×600 crops). To replace either,
just overwrite the file with the same name - no code change needed. If a headshot
file is ever missing, the card falls back to a gold-ring monogram automatically.

## Notes
- Copy is intentionally plain and non-hypey - please don't "marketing-polish" it.
- Chapter 25's public headline is "Some decisions can't be undone" (the internal
  "Bhasmasura Problem" title is deliberately not shown).
