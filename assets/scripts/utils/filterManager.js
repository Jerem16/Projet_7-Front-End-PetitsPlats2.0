import {
    get_SStorage,
    save_SStorage,
} from "./sessionStorage.js";
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

    mainFilterRecipes(query) {
        if (query.length < 2) {
            this.filteredData = this.originalData;
        } else {
            const loweredQuery = escapeHTML(query.toLowerCase());

            const selectedFilters = get_SStorage();
            if (!selectedFilters["main"].includes(loweredQuery)) {
                selectedFilters["main"].push(loweredQuery);
            }
            save_SStorage(selectedFilters);

            this.filteredData = this.originalData.filter((recipe) => {
                return (
                    recipe.name.includes(loweredQuery) ||
                    recipe.description.includes(loweredQuery) ||
                    recipe.ingredients.some((ingredient) =>
                        ingredient.ingredient.includes(loweredQuery)
                    )
                );
            });
        }
        return this.filteredData;
    }

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
