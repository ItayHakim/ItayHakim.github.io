const orbitSelectors = {
    illustration: ".hero-art",
    particles: ".orbit-electron",
    particleDot: ".orbit-electron-dot"
};

function createParticleTrail(particleGroup) {
    const trail = [];

    for (let index = 0; index < orbitConfig.trailSegments; index++) {
        const segment = document.createElementNS(orbitConfig.svgNamespace, "path");
        const fade = 1 - index / orbitConfig.trailSegments;

        segment.id = `${particleGroup.id}-trail-${index + 1}`;
        segment.setAttribute("class", "orbit-trail");
        segment.setAttribute("stroke-width", (0.5 + 2.6 * fade).toFixed(2));
        segment.setAttribute("opacity", (0.48 * fade * fade).toFixed(3));
        particleGroup.insertBefore(segment, particleGroup.firstChild);
        trail.push(segment);
    }

    return trail;
}

function getOrbitParticles() {
    const particleGroups = document.querySelectorAll(orbitSelectors.particles);
    const particles = [];

    for (const particleGroup of particleGroups) {
        const track = document.getElementById(particleGroup.dataset.track);
        const dot = particleGroup.querySelector(orbitSelectors.particleDot);
        particleGroup.setAttribute("transform", track.getAttribute("transform") || "rotate(0)");

        particles.push({
            track: track,
            dot: dot,
            trail: createParticleTrail(particleGroup),
            trackLength: track.getTotalLength(),
            startPosition: Number(particleGroup.dataset.phase),
            direction: Number(particleGroup.dataset.direction)
        });
    }

    return particles;
}

function getPointOnOrbit(particle, progress) {
    // Wrap the position to 0–1, including particles moving backwards.
    const position = (progress % 1 + 1) % 1;
    return particle.track.getPointAtLength(position * particle.trackLength);
}

function updateParticlePosition(particle, elapsedTime) {
    const progress = particle.startPosition + particle.direction * elapsedTime / orbitConfig.duration;
    let previousPoint = getPointOnOrbit(particle, progress);

    particle.dot.setAttribute("cx", previousPoint.x);
    particle.dot.setAttribute("cy", previousPoint.y);

    particle.trail.forEach((segment, index) => {
        const trailOffset = particle.direction * orbitConfig.trailLength * (index + 1) / orbitConfig.trailSegments;
        const nextPoint = getPointOnOrbit(particle, progress - trailOffset);
        segment.setAttribute("d", `M${previousPoint.x} ${previousPoint.y} L${nextPoint.x} ${nextPoint.y}`);
        previousPoint = nextPoint;
    });
}

function drawOrbitParticles(particles, elapsedTime) {
    for (const particle of particles) {
        updateParticlePosition(particle, elapsedTime);
    }
}

function setupOrbitAnimation() {
    const particles = getOrbitParticles();
    const reducedMotion = window.matchMedia(siteConfig.reducedMotion);
    const illustration = document.querySelector(orbitSelectors.illustration);
    let animationFrame;
    let previousTime = null;
    let elapsedTime = 0;
    let isVisible = true;

    function animateParticles(currentTime) {
        if (previousTime !== null) {
            elapsedTime = (elapsedTime + currentTime - previousTime) % orbitConfig.duration;
        }

        previousTime = currentTime;
        drawOrbitParticles(particles, elapsedTime);
        animationFrame = requestAnimationFrame(animateParticles);
    }

    function updateAnimationState() {
        cancelAnimationFrame(animationFrame);
        previousTime = null;

        if (!reducedMotion.matches && !document.hidden && isVisible) {
            animationFrame = requestAnimationFrame(animateParticles);
        }
    }

    drawOrbitParticles(particles, 0);
    updateAnimationState();
    reducedMotion.addEventListener("change", updateAnimationState);
    document.addEventListener("visibilitychange", updateAnimationState);

    const observer = new IntersectionObserver(entries => {
        isVisible = entries[0].isIntersecting;
        updateAnimationState();
    });
    observer.observe(illustration);
}
