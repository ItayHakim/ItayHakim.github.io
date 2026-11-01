const walkthroughSelectors = {
    tabs: ".flow-tab",
    panel: "#flow-panel",
    stepNumber: "#step-number",
    stepTitle: "#step-title",
    stepDescription: "#step-description",
    stepAssertion: "#step-assertion",
    stepIcon: "#flow-icon"
};

function showWalkthroughStep(stepIndex, focusTab = false) {
    const selectors = walkthroughSelectors;
    const tabs = document.querySelectorAll(selectors.tabs);
    const step = walkthroughSteps[stepIndex];

    tabs.forEach((tab, index) => {
        const isSelected = index === stepIndex;
        tab.setAttribute("aria-selected", String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;
    });

    document.querySelector(selectors.panel).setAttribute("aria-labelledby", tabs[stepIndex].id);
    document.querySelector(selectors.stepNumber).textContent = "STEP 0" + (stepIndex + 1) + " / 03";
    document.querySelector(selectors.stepTitle).textContent = step.title;
    document.querySelector(selectors.stepDescription).textContent = step.description;
    document.querySelector(selectors.stepAssertion).textContent = step.assertion;
    // The icons are fixed SVG markup from walkthroughData.js.
    document.querySelector(selectors.stepIcon).innerHTML = step.icon;

    if (focusTab) {
        tabs[stepIndex].focus();
    }
}

function handleWalkthroughKey(event, currentIndex, totalSteps) {
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
    showWalkthroughStep(nextIndex, true);
}

function setupWalkthrough() {
    const tabs = document.querySelectorAll(walkthroughSelectors.tabs);

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => showWalkthroughStep(index));
        tab.addEventListener("keydown", event => handleWalkthroughKey(event, index, tabs.length));
    });
}
