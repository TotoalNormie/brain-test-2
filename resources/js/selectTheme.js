export function selectTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
}

export function removeTheme() {
    document.documentElement.dataset.theme = "default";
    localStorage.removeItem("theme");
}

export function getTheme() {
    return localStorage.getItem("theme");
}

export function setCurrentTheme() {
    if (getTheme() === null) {
        selectTheme("default");
    } else {
        selectTheme(getTheme());
    }
}