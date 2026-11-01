const contactSelectors = {
    copyButton: "#copy-email",
    copyLabel: "#copy-label",
    copyStatus: "#copy-status"
};

function copyEmailWithTextField(email, copyButton) {
    const textField = document.createElement("textarea");
    textField.value = email;
    textField.setAttribute("readonly", "");
    textField.style.cssText = "position:fixed;left:-9999px;top:0";
    document.body.appendChild(textField);
    textField.select();

    let copied = false;
    try {
        copied = document.execCommand("copy");
    } catch {
        copied = false;
    }

    textField.remove();
    copyButton.focus();
    return copied;
}

async function copyEmailToClipboard(email, copyButton) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(email);
            return true;
        }
    } catch {
        // Use the text field fallback when clipboard access is denied.
    }

    return copyEmailWithTextField(email, copyButton);
}

function showCopyResult(copied) {
    const copyLabel = document.querySelector(contactSelectors.copyLabel);
    const copyStatus = document.querySelector(contactSelectors.copyStatus);

    copyLabel.textContent = copied ? "Copied!" : "Select email to copy";
    copyStatus.textContent = copied
        ? "Email address copied to clipboard."
        : "Copy unavailable. Select the email address above to copy it manually.";
}

function setupCopyEmail() {
    const copyButton = document.querySelector(contactSelectors.copyButton);
    const copyLabel = document.querySelector(contactSelectors.copyLabel);
    let copyTimer;

    copyButton.hidden = false;
    copyButton.addEventListener("click", async () => {
        const copied = await copyEmailToClipboard(copyButton.dataset.email, copyButton);

        clearTimeout(copyTimer);
        showCopyResult(copied);
        copyTimer = setTimeout(() => {
            copyLabel.textContent = "Copy email";
        }, siteConfig.copyMessageDuration);
    });
}
