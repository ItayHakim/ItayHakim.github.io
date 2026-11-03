const orbitLayers = {
    ui: {
        track: "orbit-right",
        label: "orbit-label-ui",
        particle: "orbit-electron-right",
        description: "Real user journeys. Tested from the first click to the final assertion."
    },
    api: {
        track: "orbit-left",
        label: "orbit-label-api",
        particle: "orbit-electron-left",
        description: "Beyond the interface. Checking responses, integrations, and the details between systems."
    },
    ci: {
        track: "orbit-outer",
        label: "orbit-label-ci",
        particle: "orbit-electron-outer",
        description: "Confidence in every release. Regression tests and clear reports, built into the pipeline."
    }
};

function setupOrbitExplorer() {
    const explorer = document.getElementById("orbit-explorer");
    const illustration = document.getElementById("hero-art");
    const description = document.getElementById("orbit-layer-description");
    const buttons = [...explorer.querySelectorAll(".orbit-layer-button")];

    for (const [key, layer] of Object.entries(orbitLayers)) {
        const bubble = document.getElementById(`${layer.label}-rect`);
        bubble.dataset.layer = key;
        bubble.setAttribute("role", "button");
        bubble.setAttribute("tabindex", "0");
        bubble.setAttribute("aria-label", `${key.toUpperCase()} testing`);
        bubble.setAttribute("aria-controls", description.id);
        bubble.addEventListener("keydown", event => {
            if (event.key === " ") event.preventDefault();
            if (event.key === "Enter" && !event.repeat) {
                event.preventDefault();
                selectLayer(key);
            }
        });
        bubble.addEventListener("keyup", event => {
            if (event.key !== " ") return;
            event.preventDefault();
            selectLayer(key);
        });
        buttons.push(bubble);
    }

    // Interactive SVG controls must be exposed outside the illustration's image role.
    illustration.setAttribute("role", "group");
    const svg = document.getElementById("orbit-art");
    svg.removeAttribute("aria-hidden");
    svg.setAttribute("role", "group");
    svg.setAttribute("aria-label", "Explore UI, API and CI testing layers");

    function selectLayer(selectedLayer) {
        const selected = orbitLayers[selectedLayer];
        illustration.dataset.layer = selectedLayer;
        description.textContent = selected.description;
        buttons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.layer === selectedLayer)));

        for (const [key, layer] of Object.entries(orbitLayers)) {
            for (const id of [layer.track, layer.label, layer.particle]) {
                document.getElementById(id).classList.toggle("is-active-layer", key === selectedLayer);
            }
        }
    }

    buttons.forEach(button => button.addEventListener("click", () => selectLayer(button.dataset.layer)));
    selectLayer("ui");
    explorer.hidden = false;
}
