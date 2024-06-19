import { get_URL, save_URL, remove_URL } from "./URL.js";

export function get_SStorage() {
    let storedFilters = JSON.parse(sessionStorage.getItem("filters")) || {
        ingredients: [],
        appliance: [],
        utensils: [],
        main: [],
    };

    const urlFilters = get_URL();

    for (const key in urlFilters) {
        if (Array.isArray(urlFilters[key])) {
            urlFilters[key].forEach((filter) => {
                if (!storedFilters[key].includes(filter)) {
                    storedFilters[key].push(filter);
                }
            });
        }
    }

    sessionStorage.setItem("filters", JSON.stringify(storedFilters));
    return storedFilters;
}

export function save_SStorage(filters) {
    // Assurer l'unicité des filtres avant de sauvegarder
    for (const key in filters) {
        if (Array.isArray(filters[key])) {
            filters[key] = [...new Set(filters[key])];
        }
    }

    sessionStorage.setItem("filters", JSON.stringify(filters));
    save_URL(filters);
}

export function remove_SStorage() {
    sessionStorage.removeItem("filters");
    remove_URL(); // Supprime les filtres de l'URL
}

export function reset_SStorage(filters) {
    // Vérifie si tous les tableaux de filtres sont vides
    const isEmpty = Object.values(filters).every(
        (filter) => filter.length === 0
    );

    if (isEmpty) {
        console.log("vide");
        remove_SStorage();
    } else {
        return;
    }
}
