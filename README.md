# Levi Masterplan — iPhone web app

## Included
- Dark-themed dashboard
- Monday–Sunday weekly calendar
- Activities by day, with editable class and sports categories
- Four color-coded sports categories (Baseball, Soccer, Sport 3, Sport 4)
- Goals with progress percentages and target dates
- Daily checklist
- Accent color customization
- JSON export/import backup
- PWA manifest, icons, and basic offline caching

## Important limitations
- Entries are saved locally in the browser on this device. Export a backup before clearing browser data.
- This starter version does not send push notifications or sync school calendars. Web push requires a push provider/server and additional setup.
- To install it as an iPhone Home Screen web app, the files need to be hosted on an HTTPS website.

## Easiest hosting: GitHub Pages
1. On a computer, sign in to GitHub and create a new **public** repository named `levi-masterplan`.
2. Upload `index.html`, `manifest.json`, `sw.js`, and the `icons` folder into the repository's root.
3. Open repository **Settings → Pages**.
4. Under Build and deployment, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
5. Wait for GitHub Pages to show your website URL, usually `https://YOUR-USERNAME.github.io/levi-masterplan/`.
6. Open that URL in **Safari on your iPhone**.
7. Tap **Share** → **Add to Home Screen** → make sure **Open as Web App** is enabled if shown → **Add**.
8. Launch Levi Masterplan from the new Home Screen icon.

## Add activities
Go to **Schedule → Add activity**. Choose the day and category. The four sports categories are color-coded. Rename Sport 3 and Sport 4 in Settings.
