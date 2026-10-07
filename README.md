# Yash Panchal — Cybersecurity Portfolio

A clean, responsive React + Vite portfolio focused on cybersecurity, networking, SOC operations, and security projects.

## What changed

- Professional dark security-focused visual system with restrained green/blue accents.
- Smooth reveal, hover, grid and hero animations with reduced-motion support.
- Centralized portfolio content in `src/data/portfolio.js`.
- Live GitHub profile/repository data in the GitHub section using the public GitHub API.
- Featured GitHub repositories: Yevil, Subnetly, Blockdrive, and Nightshade Steg.
- Responsive navigation, project filtering, certification modal, contact flow, and accessible focus states.
- Empty resume field no longer creates a broken link. Contact links include Gmail, LinkedIn, and GitHub.

## Easy updates

Most edits only require `src/data/portfolio.js`:

- `profile` → name, roles, tagline, bio, email, LinkedIn, GitHub, resume, location.
- `skillGroups` → skills and tools.
- `certifications` → certificates and credential links.
- `projects` → portfolio project cards and live/repository links.
- `education` → academic timeline.
- `experience` → training/work details.
- `achievements` → headline metrics.
- `githubConfig` → GitHub username and featured repository order.

### GitHub auto-sync

The portfolio fetches the public profile and repository list from:

`https://api.github.com/users/R00T-AN0N`

No GitHub token is required for public repositories. If the API is temporarily unavailable or rate-limited, the rest of the portfolio remains usable and the GitHub section shows a graceful fallback message.

## Run locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Production build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

This project is configured for manual deployment from the `docs` folder on the
`main` branch.

1. Build the website locally:

   ```bash
   npm install
   npm run build
   ```

   This creates the production website in `docs/`.
2. Upload or push the project files, including the generated `docs/` folder, to
   the `main` branch of your `yashpanchal.github.io` repository. Do not upload
   `node_modules`.
3. In the GitHub repository, open **Settings → Pages**. Under **Build and
   deployment**, select **Deploy from a branch**, choose `main` and `/docs`, and
   save.
4. After GitHub Pages publishes the site, it will be available at
   `https://yashpanchal.github.io/`.

For later updates, run `npm run build` again and upload/push the changed project
files and refreshed `docs/` folder to `main`.
