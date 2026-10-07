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

The GitHub Actions workflow builds the site and deploys it to GitHub Pages whenever
you push to the `main` branch.

1. Create a GitHub repository. For a personal site at
   `https://YOUR-USERNAME.github.io`, name it `YOUR-USERNAME.github.io`.
   Otherwise, choose any repository name; the site URL will be
   `https://YOUR-USERNAME.github.io/REPOSITORY-NAME`.
2. In the repository, open **Settings → Pages** and set the build and deployment
   source to **GitHub Actions**.
3. From this project folder, connect the repository and push the project:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/REPOSITORY-NAME.git
   git push -u origin main
   ```

   Replace `YOUR-USERNAME` and `REPOSITORY-NAME` with your GitHub details. Do not
   include `node_modules` or `dist`; both are excluded from Git.
4. Open the repository's **Actions** tab and wait for the Pages deployment
   workflow to finish. Your site will then be available at the URL for the
   repository type you chose above. Future pushes to `main` deploy automatically.
