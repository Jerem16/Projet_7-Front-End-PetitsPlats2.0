export function capitalizeText(text) {
    // Divise le texte en phrases en utilisant un point suivi d'un espace
    const sentences = text.split(/\. (?=[A-Za-z])|\.$/);
    // Capitalise la première lettre de chaque phrase
    const capitalizedSentences = sentences.map((sentence) => {
        return sentence.charAt(0).toUpperCase() + sentence.slice(1);
    });
    // Rejoint les phrases avec un point et un espace
    return capitalizedSentences.join(". ");
}
