const walkthroughSelectors = {
    projects: ".project-panel",
    tabs: ".flow-tab",
    panel: ".flow-panel",
    stepNumber: ".step-number",
    stepTitle: ".flow-panel h4",
    stepDescription: ".flow-panel > p",
    stepAssertion: ".code-line",
    stepIcon: ".demo-icon svg",
    visual: ".flow-visual",
    journey: ".flow-journey-stop",
    progressDots: ".window-dots > span"
};

const projectSelectors = {
    showcase: "#project-showcase",
    bookmarks: "#project-bookmarks",
    tabs: ".project-bookmark",
    horizontalScreen: "(max-width: 900px)"
};

function showWalkthroughStep(project, stepIndex, focusTab = false) {
    const selectors = walkthroughSelectors;
    const tabs = project.querySelectorAll(selectors.tabs);
    const steps = projectWalkthroughs[project.dataset.walkthrough];
    const step = steps[stepIndex];

    tabs.forEach((tab, index) => {
        const isSelected = index === stepIndex;
        tab.setAttribute("aria-selected", String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;
    });

    const dots = project.querySelectorAll(selectors.progressDots);
    dots.forEach((dot, index) => {
        dot.classList.toggle("is-active", index <= stepIndex);
    });

    project.querySelector(selectors.panel).setAttribute("aria-labelledby", tabs[stepIndex].id);
    project.querySelector(selectors.stepNumber).textContent = `STEP 0${stepIndex + 1} / 0${steps.length}`;
    project.querySelector(selectors.stepTitle).textContent = step.title;
    project.querySelector(selectors.stepDescription).textContent = step.description;
    project.querySelector(selectors.stepAssertion).textContent = step.assertion;
    // The icons are fixed SVG markup from walkthroughData.js.
    project.querySelector(selectors.stepIcon).innerHTML = step.icon;
    project.querySelector(selectors.visual).dataset.step = String(stepIndex);
    project.querySelectorAll(selectors.journey).forEach(stop => {
        const index = Number(stop.dataset.journeyStep);
        stop.classList.toggle("is-current", index === stepIndex);
        stop.classList.toggle("is-complete", index < stepIndex);
    });

    const panel = project.querySelector(selectors.panel);
    if (!isMotionReduced() && panel.animate) {
        panel.getAnimations().forEach(animation => animation.cancel());
        panel.animate([
            { opacity: 0.3, transform: "translateY(8px)" },
            { opacity: 1, transform: "translateY(0)" }
        ], { duration: 280, easing: "ease-out" });
    }

    if (focusTab) {
        tabs[stepIndex].focus();
    }
}

function handleWalkthroughKey(event, project, currentIndex, totalSteps) {
    let nextIndex;

    switch (event.key) {
        case "ArrowRight":
            nextIndex = (currentIndex + 1) % totalSteps;
            break;
        case "ArrowLeft":
            nextIndex = (currentIndex + totalSteps - 1) % totalSteps;
            break;
        case "Home":
            nextIndex = 0;
            break;
        case "End":
            nextIndex = totalSteps - 1;
            break;
        default:
            return;
    }

    event.preventDefault();
    event.stopPropagation();
    showWalkthroughStep(project, nextIndex, true);
}

function setupProjectBookmarks() {
    const showcase = document.querySelector(projectSelectors.showcase);
    const bookmarks = document.querySelector(projectSelectors.bookmarks);
    const tabs = [...bookmarks.querySelectorAll(projectSelectors.tabs)];
    const projects = tabs.map(tab => document.getElementById(tab.getAttribute("aria-controls")));
    const horizontalScreen = window.matchMedia(projectSelectors.horizontalScreen);

    function showProject(projectIndex, focusTab = false) {
        tabs.forEach((tab, index) => {
            const isSelected = index === projectIndex;
            tab.setAttribute("aria-selected", String(isSelected));
            tab.tabIndex = isSelected ? 0 : -1;
            projects[index].hidden = !isSelected;
        });
        // Reveal a newly selected project even before its scroll observer runs.
        projects[projectIndex].classList.add("is-revealed");
        if (focusTab) tabs[projectIndex].focus();
    }

    function updateOrientation() {
        bookmarks.setAttribute("aria-orientation", horizontalScreen.matches ? "horizontal" : "vertical");
    }

    projects.forEach((project, index) => {
        project.setAttribute("role", "tabpanel");
        project.setAttribute("aria-labelledby", tabs[index].id);
        project.tabIndex = 0;
    });
    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => showProject(index));
        tab.addEventListener("keydown", event => {
            const nextKey = horizontalScreen.matches ? "ArrowRight" : "ArrowDown";
            const previousKey = horizontalScreen.matches ? "ArrowLeft" : "ArrowUp";
            let nextIndex;
            if (event.key === nextKey) nextIndex = (index + 1) % tabs.length;
            else if (event.key === previousKey) nextIndex = (index + tabs.length - 1) % tabs.length;
            else if (event.key === "Home") nextIndex = 0;
            else if (event.key === "End") nextIndex = tabs.length - 1;
            else return;
            event.preventDefault();
            showProject(nextIndex, true);
        });
    });

    updateOrientation();
    horizontalScreen.addEventListener("change", updateOrientation);
    showProject(0);
    showcase.classList.add("has-project-tabs");
    bookmarks.hidden = false;
}

function setupWalkthrough() {
    document.querySelectorAll(walkthroughSelectors.projects).forEach(project => {
        const tabs = project.querySelectorAll(walkthroughSelectors.tabs);
        tabs.forEach((tab, index) => {
            tab.addEventListener("click", () => showWalkthroughStep(project, index));
            tab.addEventListener("keydown", event => handleWalkthroughKey(event, project, index, tabs.length));
        });
    });
    setupProjectBookmarks();
}
