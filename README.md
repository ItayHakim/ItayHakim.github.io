# Personal Website

[Visit my portfolio](https://itayhakim.github.io/)

A personal portfolio built with HTML, CSS and JavaScript, hosted on GitHub Pages.

## Project structure

```text
index.html
assets/
    fonts/                     Manrope fonts and their license
src/
    main.js                    Starts the page interactions
    config/
        siteConfig.js          Screen sizes, animation timing and trail settings
    data/
        walkthroughData.js     Text and icons for the three project steps
    scripts/
        navigation.js          Mobile menu
        projectWalkthrough.js  Project tabs and keyboard navigation
        contact.js             Copy email and its fallback
        orbitAnimation.js      Moving particles and their trails
        orbitExplorer.js       Selectable UI, API and CI testing layers
        pageMotion.js          Motion preferences, scroll reveals and active navigation
    styles/
        baseStyles.css         Fonts, colors, navigation and hero content
        orbitStyles.css        Rings, particles, frosted labels and glow
        sectionStyles.css      Project, experience, skills, about and contact
        motionStyles.css       Interactive layers and motion
        responsiveStyles.css   Screen sizes, reduced motion and printing
```

The website is organized by responsibility: HTML for content, CSS for appearance, and JavaScript files for individual page features. Each script keeps its element selectors next to the functions that use them. Shared settings and walkthrough content have their own files. Functions use descriptive names such as `showWalkthroughStep`, `copyEmailToClipboard` and `updateParticlePosition`.

## Run locally

Open `index.html` with **Open in Integrated Browser** in VS Code, or use Microsoft's **Live Preview** extension. You can also open the HTML file directly in a browser.

There is no installation or build step. The scripts use ordinary JavaScript and load in the order listed in `index.html`, with `main.js` last. This also lets the page work in a local file preview without a module server.

## Make changes

- Edit the page content and SVG illustration in `index.html`.
- Edit the project walkthrough text in `src/data/walkthroughData.js`.
- Change orbit speed, trail length or trail segments in `src/config/siteConfig.js`. A larger `duration` means a slower orbit.
- Change the frosted-glass glow in `.orbit-glass-particles` in `src/styles/orbitStyles.css`. The SVG frost and blur filters are in `index.html`.
- Keep the selectors at the top of each feature script in sync when changing element IDs or classes.

Responsive rules load last so they can override the desktop styles.

## Interaction and motion

- The orbit's UI, API and CI bubbles and the buttons below select the same testing layer, update its description, and highlight its orbit. The bubbles keep their glass appearance and hover effect, and support Tab, Enter and Space.
- The project walkthrough updates its illustration and journey indicator when a tab changes, with arrow-key navigation preserved.
- The entire contact email row, including the address and arrow, opens a Gmail compose window in a new tab with the recipient filled in. Copy email copies the address.
- Section reveals happen once. Navigation tracks the section being read, and the thin header line shows reading progress.
- The 200+ end-to-end test metric counts up once when it first comes into view. Adjust its speed with `metricCountDuration` in `src/config/siteConfig.js`.
- System reduced-motion preferences are respected automatically, and content stays visible with JavaScript disabled.

Keep the animation and explorer scripts before `main.js`; motion preferences initialize before the orbit animation starts. All interactions run locally without external libraries or network requests.

## QA selectors

Every HTML and inline SVG element has a unique, explicit `id` and a nonempty `class`, including metadata and decorative elements. Existing styling classes are preserved; `qa-*` classes identify otherwise unstyled elements.

Use IDs for individual test targets, for example `#navigation-work`, `#hero-work-link`, `#contact-email`, and `#copy-email`. Keep IDs stable when changing text or rearranging content, and give new elements their own IDs and classes.

JavaScript-created elements follow the same rule: walkthrough icon parts use `flow-register-*`, `flow-select-*`, or `flow-verify-*` IDs, orbit trails use `orbit-electron-{left|right|outer}-trail-{1..N}`, and the temporary clipboard field uses `#copy-email-fallback`.

## Publish

Commit and push `index.html`, `src/` and `assets/` together to the branch configured for GitHub Pages. The HTML file now depends on those folders.

The Manrope font license is included in `assets/fonts/OFL.txt`.
