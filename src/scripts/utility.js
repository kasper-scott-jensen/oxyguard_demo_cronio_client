
export const scrollToAnchor = (event) => {
    event.preventDefault();
    const targetId = event.target.hash.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
}

export const scrollToArg = (arg) => {
    window.location.hash = `#${arg}`
}
