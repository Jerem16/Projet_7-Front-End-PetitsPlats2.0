export function saveFiltersToSession(filters) {
    sessionStorage.setItem("filters", JSON.stringify(filters));
}

export function getFiltersFromSession() {
    const filters = sessionStorage.getItem("filters");
    return filters
        ? JSON.parse(filters)
        : { ingrédients: [], appareils: [], ustensiles: [] };
}