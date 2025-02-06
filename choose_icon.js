// Set mutation observer on weather description element.
// If target is updated, look for sun, wind or rain in text.
// If found, display corresponding icon image in icon-box.

const targetNode = document.getElementById("weather-description"); // need id or class used
const iconContainer = document.getElementById("weather-icon");

const observer = new MutationObserver(() => {
    let value = targetNode.textContent;
    if (value.contains("sun")) {
        statusIcon.src = "success.png";  // Path to success image
        iconContainer.innerHTML = "✅";  // Success icon
    }
    else if (value.contains("rain")) {
        iconContainer.innerHTML = "✅";  // Success icon
    }
    else if (value.contains("wind")) {
        iconContainer.innerHTML = "✅";  // Success icon
    }
    else {
        iconContainer.innerHTML = "";    // Clear if unknown
    }
});

observer.observe(targetNode, { childList: true });