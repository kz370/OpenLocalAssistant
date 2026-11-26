# Open Local Assistant project site

The public website, a static page with no build step and no dependencies.

```text
website/index.html                       the page
website/assets/css/site.css              styles (tokens copied from src/styles/tokens.css: graphite + teal)
website/assets/js/site.js                points the Download buttons at the newest release
website/assets/img/                      copies of docs/screenshots/* and docs/icon.webp
website/assets/more-projects/            reusable "Check my other projects" section
website/README.md                        this file (not published)
```

## Publish it

Only a Git tag deploys the site. `.github/workflows/pages.yml` runs when a tag whose name
contains `website` or `page` is pushed, and at no other time. Pushing to a branch, a pull
request, a release and a `v1.2.3` tag never deploy it, and there is no manual "Run workflow" button.

```powershell
git tag website-2026-11-26
git push origin website-2026-11-26
```

The workflow publishes the contents of `website/` (without this README) and fails before
deploying if `index.html` references an `assets/` file that is missing.

One-time repository setup (Settings):

- **Pages → Build and deployment → Source:** GitHub Actions.
- **Environments → github-pages → Deployment branches and tags:** add the tag patterns
  `*website*` and `*page*`. Without them GitHub refuses a deploy that starts from a tag.

The site is served at <https://kz370.github.io/OpenLocalAssistant/>.

## Run it locally

```powershell
cd website
python -m http.server 4173
# http://127.0.0.1:4173
```

## Keeping it current

- **Screenshots:** `assets/img/*` are copies of `docs/screenshots/*`. When a screenshot in
  `docs/screenshots/` changes, copy it over and keep the `width` and `height` attributes in
  `index.html` equal to the file's pixel size.
- **Versions:** none are hard-coded. `assets/js/site.js` reads the latest GitHub release and
  fills in the installer, portable zip and checksum links and the version badge. If the GitHub
  API is unreachable the buttons fall back to the Releases page.
- **Content comes from `README.md`.** Feature claims, shortcuts, requirements and privacy
  statements are taken from it. When the README changes, change the page too.
- **Other projects:** edit `PROJECTS` in `assets/more-projects/more-projects.js` and add the
  project's `.webp` icon beside it. `data-current="OpenLocalAssistant"` hides this project.
- **No purple, no web fonts.**
