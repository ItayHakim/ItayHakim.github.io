const pageMotionSelectors = {
    header: "#site-header",
    progress: "#reading-progress",
    links: "#navigation > a",
    sections: "main > section",
    reveals: ".section-top, .project, .metric, .experience-detail, .skill-group, .about-grid > div, .contact-grid, .contact-section > .wrap > .section-label"
};

function isMotionReduced() {
    return document.documentElement.dataset.motion === "reduced";
}

function setupMotionPreferences() {
    const preference = window.matchMedia(siteConfig.reducedMotion);

    function applyPreference() {
        document.documentElement.dataset.motion = preference.matches ? "reduced" : "full";
        document.dispatchEvent(new CustomEvent("site:motion-change"));
    }

    applyPreference();
    preference.addEventListener("change", applyPreference);
}

function setupMetricCountUp() {
    const metric = document.getElementById("metric-end-to-end-tests-metric-value");
    if (!metric || isMotionReduced() || !("IntersectionObserver" in window)) return;

    const finalText = metric.textContent.trim();
    const target = Number.parseInt(finalText, 10);
    if (!Number.isFinite(target) || target <= 0) return;
    const suffix = finalText.replace(/^\d+/, "");
    let started = false;
    let startTime = null;
    let animationFrame;

    function finishCount() {
        started = true;
        cancelAnimationFrame(animationFrame);
        observer.disconnect();
        metric.textContent = finalText;
        document.removeEventListener("site:motion-change", handleMotionChange);
        window.removeEventListener("beforeprint", finishCount);
    }

    function handleMotionChange() {
        if (isMotionReduced()) finishCount();
    }

    function updateCount(time) {
        if (startTime === null) startTime = time;
        const progress = Math.min(1, (time - startTime) / siteConfig.metricCountDuration);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        metric.textContent = Math.floor(target * easedProgress) + suffix;
        if (progress < 1) animationFrame = requestAnimationFrame(updateCount);
        else finishCount();
    }

    const observer = new IntersectionObserver(entries => {
        if (started || !entries.some(entry => entry.isIntersecting)) return;
        started = true;
        observer.disconnect();
        animationFrame = requestAnimationFrame(updateCount);
    }, { threshold: 0.2 });

    metric.textContent = "0" + suffix;
    observer.observe(metric);
    document.addEventListener("site:motion-change", handleMotionChange);
    window.addEventListener("beforeprint", finishCount);
}

function setupPageMotion() {
    const header = document.querySelector(pageMotionSelectors.header);
    const progress = document.querySelector(pageMotionSelectors.progress);
    const links = [...document.querySelectorAll(pageMotionSelectors.links)];
    const sections = [...document.querySelectorAll(pageMotionSelectors.sections)];
    let scrollFrame = null;

    function updateScrollState() {
        const distance = document.documentElement.scrollHeight - window.innerHeight;
        const amount = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
        progress.style.transform = `scaleX(${amount})`;
        header.classList.toggle("is-scrolled", window.scrollY > 24);

        let activeId = "top";
        const readingLine = header.offsetHeight + window.innerHeight * 0.25;
        for (const section of sections) {
            if (section.getBoundingClientRect().top <= readingLine) activeId = section.id;
        }
        for (const link of links) {
            if (link.getAttribute("href") === `#${activeId}`) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
        }
        scrollFrame = null;
    }

    function scheduleScrollUpdate() {
        if (scrollFrame === null) scrollFrame = requestAnimationFrame(updateScrollState);
    }

    window.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
    window.addEventListener("resize", scheduleScrollUpdate);
    if ("ResizeObserver" in window) new ResizeObserver(scheduleScrollUpdate).observe(document.body);
    updateScrollState();

    // Content stays visible without JavaScript, without observers, or with reduced motion.
    if (!("IntersectionObserver" in window) || isMotionReduced()) return;

    const reveals = document.querySelectorAll(pageMotionSelectors.reveals);
    const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
        }
    }, { threshold: 0.08 });

    reveals.forEach(element => {
        element.classList.add("reveal-ready");
        observer.observe(element);
    });

    document.addEventListener("site:motion-change", () => {
        if (!isMotionReduced()) return;
        reveals.forEach(element => element.classList.add("is-revealed"));
        observer.disconnect();
    });
}
