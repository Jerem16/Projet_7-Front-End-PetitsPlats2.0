import { get_SStorage, save_SStorage } from "./sessionStorage.js";
import { escapeHTML } from "./noXss.js";

export class FilterManager {
    constructor(recipes) {
        this.recipes = recipes;
        this.originalData = this.toLowerCase();
        this.filteredData = this.originalData;
        this.newFilteredData = this.filteredData;
    }

    toLowerCase() {
        return this.recipes.map((recipe) => this.recipeToLowerCase(recipe));
    }

    recipeToLowerCase(recipe) {
        const transformedRecipe = {};
        for (const key in recipe) {
            switch (typeof recipe[key]) {
                case "string":
                    transformedRecipe[key] = recipe[key].toLowerCase();
                    break;
                case "object":
                    if (Array.isArray(recipe[key])) {
                        transformedRecipe[key] = recipe[key].map((item) =>
                            typeof item === "object" && item !== null
                                ? this.recipeToLowerCase(item)
                                : item.toLowerCase()
                        );
                    } else {
                        transformedRecipe[key] = this.recipeToLowerCase(
                            recipe[key]
                        );
                    }
                    break;
                default:
                    transformedRecipe[key] = recipe[key];
                    break;
            }
        }
        return transformedRecipe;
    }
    // Vérifie si la chaîne target contient la chaîne query
    stringIncludes(query, target) {
        // Parcourt la chaîne target avec une boucle for
        for (let i = 0; i <= target.length - query.length; i++) {
            // Substring extrait une sous-chaîne de target de longueur égale à query. Elle prend deux arguments : l'index de début (inclus) et l'index de fin (exclus)
            let substr = target.substring(i, i + query.length);

            // Compare la sous-chaîne substr avec query
            if (substr === query) {
                // Si elles sont égales, retourne true
                return true;
            }
        }
        // Si aucune correspondance n'est trouvée, retourne false
        return false;
    }

    // Vérifie si un des ingrédients contient la chaîne query
    ingredientIncludesQuery(query, ingredients) {
        for (const object of ingredients) {
            if (this.stringIncludes(query, object.ingredient)) {
                return true;
            }
        }
        return false;
    }

    mainFilterRecipes(query) {
        if (query.length < 2) {
            this.filteredData = this.originalData;
        } else {
            const loweredQuery = escapeHTML(query.toLowerCase());

            const selectedFilters = get_SStorage(); // Récupère les filtres de session si history

            // Utilise une boucle for of pour vérifier si le filtre main à été défini dans history
            let found = false;
            for (const filter of selectedFilters["main"]) {
                // Utilise une boucle for...of pour vérifier si le filtre existe
                if (filter === loweredQuery) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                // Ajoute le filtre s'il n'existe pas
                selectedFilters["main"].push(loweredQuery);
            }

            save_SStorage(selectedFilters); // Sauvegarde les filtres mis à jour

            let filteredData = [];
            for (const recipe of this.originalData) {
                // Utilise la boucle for of de la methode stringIncludes pour filtrer les recettes
                let titleIncludesQuery = this.stringIncludes(
                    loweredQuery,
                    recipe.name
                );
                let descriptionIncludesQuery = this.stringIncludes(
                    loweredQuery,
                    recipe.description
                );
                let ingredientIncludesQueryFlag = this.ingredientIncludesQuery(
                    loweredQuery,
                    recipe.ingredients
                );

                if (
                    titleIncludesQuery ||
                    descriptionIncludesQuery ||
                    ingredientIncludesQueryFlag
                ) {
                    // Ajoute la recette si elle correspond à la query
                    filteredData.push(recipe);
                }
            }

            this.filteredData = filteredData; // Met à jour les données filtrées
        }
        return this.filteredData; // Retourne les données filtrées
    }

    // Réinitialise les filtres principaux et retourne les données originales
    resetMainFilterRecipes() {
        this.filteredData = this.originalData;
        return this.filteredData;
    }

    getAdvancedOptions() {
        const ingredients = new Set();
        this.newFilteredData.forEach((recipe) => {
            recipe.ingredients.forEach((item) => {
                ingredients.add(item.ingredient);
            });
        });
        const ingredientsArray = Array.from(ingredients).sort();

        const appliance = new Set();
        this.newFilteredData.forEach((item) => {
            appliance.add(item.appliance);
        });
        const appliancesArray = Array.from(appliance).sort();

        const utensils = new Set();
        this.newFilteredData.forEach((recipe) => {
            recipe.utensils.forEach((utensil) => {
                utensils.add(utensil);
            });
        });
        const utensilsArray = Array.from(utensils).sort();

        const advancedFiltersObject = {
            ingredients: ingredientsArray,
            appliance: appliancesArray,
            utensils: utensilsArray,
        };
        return advancedFiltersObject;
    }

    updateFilteredRecipes(filters) {
        const { ingredients = [], appliance = [], utensils = [] } = filters;

        return this.filteredData.filter((recipe) => {
            const hasIngredients = ingredients.every((ingredient) =>
                recipe.ingredients.some(
                    (rec) =>
                        rec.ingredient.toLowerCase() ===
                        ingredient.toLowerCase()
                )
            );
            const hasAppliance =
                !appliance.length ||
                appliance.includes(recipe.appliance.toLowerCase());
            const hasUtensils = utensils.every((utensil) =>
                recipe.utensils.includes(utensil.toLowerCase())
            );

            return hasAppliance && hasIngredients && hasUtensils;
        });
    }

    updateAdvancedOptions(filters) {
        this.newFilteredData = this.updateFilteredRecipes(filters);
        const advancedFilters = this.getAdvancedOptions();
        return advancedFilters;
    }
}
