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
    styles/
        baseStyles.css         Fonts, colors, navigation and hero content
        orbitStyles.css        Rings, particles, frosted labels and glow
        sectionStyles.css      Project, experience, skills, about and contact
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

The four stylesheets keep their original order. Responsive rules load last so they can override the desktop styles.

## QA selectors

Every HTML and inline SVG element has a unique, explicit `id` and a nonempty `class`, including metadata and decorative elements. Existing styling classes are preserved; `qa-*` classes identify otherwise unstyled elements.

Use IDs for individual test targets, for example `#navigation-work`, `#hero-work-link`, `#contact-email`, and `#copy-email`. Keep IDs stable when changing text or rearranging content, and give new elements their own IDs and classes.

JavaScript-created elements follow the same rule: walkthrough icon parts use `flow-register-*`, `flow-select-*`, or `flow-verify-*` IDs, orbit trails use `orbit-electron-{left|right|outer}-trail-{1..N}`, and the temporary clipboard field uses `#copy-email-fallback`.

## Publish

Commit and push `index.html`, `src/` and `assets/` together to the branch configured for GitHub Pages. The HTML file now depends on those folders.

The Manrope font license is included in `assets/fonts/OFL.txt`.
