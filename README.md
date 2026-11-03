# Gatherly — Event Management Website

A responsive event discovery and registration website built for the **K Explore – Web Designing** assignment using HTML5, CSS3 and vanilla JavaScript.

## Features

- Modern landing page with hero section, featured event cards, about section and newsletter signup.
- Six sample events with title, date/time, category, venue, price, image and description.
- Search events by title, category, venue, city or description.
- Category filters for Technology, Design, Music, Wellness and Community.
- Event detail modal with a live countdown and registration call-to-action.
- Registration form for name, email, phone number and selected event.
- JavaScript validation with clear field-level error messages.
- Successful registration confirmation toast.
- Local Storage for registrations, saved events, theme preference and newsletter signups.
- Dark/light mode toggle.
- Responsive mobile navigation and layouts for phones, tablets and desktops.
- Keyboard support: `Ctrl/Cmd + K` focuses event search; `Esc` closes dialogs.
- Accessible labels, dialog roles, focus outlines, reduced-motion support and semantic HTML.

## Project structure

```text
k-explore-event-management/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a browser, or use the **Live Server** extension in VS Code.
3. No package installation or build step is required.

## Local Storage keys

- `gatherlyRegistrations` — registration objects, including participant details and selected event.
- `gatherlySavedEvents` — IDs of saved events.
- `gatherlyTheme` — selected light/dark theme.
- `gatherlySubscribers` — newsletter email addresses.


## Customize the events

Edit the `events` array near the top of `script.js`. Each event has an `id`, `title`, `category`, `date`, `dateLabel`, `venue`, `city`, `price`, `image`, `short`, `description` and `featured` property. Use dates in ISO format for the countdown.

Images are loaded from Unsplash and Google Fonts are loaded online, so an internet connection is needed for those external assets. Replace image URLs with your own assets if desired.

## Deploy

### GitHub Pages
1. Create a GitHub repository and push these files.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select `main` and `/ (root)`, then save.
5. Wait for the published URL shown in Pages settings.

### Netlify
1. Sign in to Netlify and choose **Add new site → Deploy manually**.
2. Drag the project folder into the deployment area, or connect the GitHub repository.
3. Netlify will publish the static site and provide a URL.

### Vercel
1. Import the GitHub repository into Vercel.
2. Keep the framework preset as **Other**.
3. Leave the build command and output directory empty/default for a static HTML project, then deploy.

<!-- ## Git workflow

```bash
git init
git add .
git commit -m "Build responsive Gatherly event website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
``` -->


