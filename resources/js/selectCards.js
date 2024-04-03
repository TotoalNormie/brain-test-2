export function selectCards(cards) {
    localStorage.setItem("cards", cards);
}

export function removeCards() {
    localStorage.removeItem("cards");
}

export function getCards() {
    return localStorage.getItem("cards");
}

export function setCurrentCards() {
    if (getCards() === null) {
        selectCards("animals");
    } else {
        selectCards(getCards());
    }
}