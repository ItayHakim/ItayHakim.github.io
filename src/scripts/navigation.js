const navigationSelectors = {
    menuButton: "#menu-button",
    menuSymbol: "#menu-button span",
    links: "#navigation"
};

function setMenuState(isOpen) {
    const menuButton = document.querySelector(navigationSelectors.menuButton);
    const menuSymbol = document.querySelector(navigationSelectors.menuSymbol);
    const navigation = document.querySelector(navigationSelectors.links);

    navigation.hidden = !isOpen;
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuSymbol.textContent = isOpen ? "−" : "+";
}

function updateMenuForScreen(mobileScreen) {
    const menuButton = document.querySelector(navigationSelectors.menuButton);
    menuButton.hidden = !mobileScreen.matches;
    setMenuState(!mobileScreen.matches);
}

function setupNavigation() {
    const menuButton = document.querySelector(navigationSelectors.menuButton);
    const navigation = document.querySelector(navigationSelectors.links);
    const mobileScreen = window.matchMedia(siteConfig.mobileScreen);

    updateMenuForScreen(mobileScreen);
    mobileScreen.addEventListener("change", () => updateMenuForScreen(mobileScreen));
    menuButton.addEventListener("click", () => setMenuState(navigation.hidden));

    navigation.addEventListener("click", event => {
        if (event.target.closest("a") && mobileScreen.matches) {
            setMenuState(false);
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && mobileScreen.matches && !navigation.hidden) {
            setMenuState(false);
            menuButton.focus();
        }
    });
}
