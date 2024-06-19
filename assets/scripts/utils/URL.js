export function save_URL(filters) {
    const params = new URLSearchParams();

    // Ajoute chaque type de filtre dans l'URL séparément
    Object.keys(filters).forEach((key) => {
        if (Array.isArray(filters[key]) && filters[key].length > 0) {
            params.set(key, filters[key].join(","));
        }
    });

    window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${params}`
    );
}

export function get_URL() {
    const params = new URLSearchParams(window.location.search);
    const filters = {
        ingredients: params.get("ingredients")
            ? params.get("ingredients").split(",")
            : [],
        appliance: params.get("appliance") ? [params.get("appliance")] : [],
        utensils: params.get("utensils")
            ? params.get("utensils").split(",")
            : [],
        main: params.get("main") ? [params.get("main")] : [], // Définissez une valeur par défaut si nécessaire
    };

    return filters;
}

export function remove_URL() {
    window.history.replaceState({}, "", `${window.location.pathname}`);
}
