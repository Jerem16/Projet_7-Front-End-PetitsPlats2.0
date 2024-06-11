import {
    get_SStorage,
    save_SStorage,
    remove_SStorage,
} from "./sessionStorage.js";
export class RecipeFilter {
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
        remove_SStorage();
        if (query.length < 3) {
            this.filteredData = this.originalData;
        } else {
            const loweredQuery = query.toLowerCase();

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
        console.log(this.filteredData);
        return this.filteredData;
    }

    getAdvancedFilters() {
        const ingredients = new Set();
        this.newFilteredData.forEach((recipe) => {
            recipe.ingredients.forEach((item) => {
                ingredients.add(item.ingredient);
            });
        });
        const ingredientsArray = Array.from(ingredients);

        const appliance = new Set();
        this.newFilteredData.forEach((item) => {
            appliance.add(item.appliance);
        });
        const appliancesArray = Array.from(appliance);

        const utensils = new Set();
        this.newFilteredData.forEach((recipe) => {
            recipe.utensils.forEach((utensil) => {
                utensils.add(utensil);
            });
        });
        const utensilsArray = Array.from(utensils);

        const advancedFiltersObject = {
            ingredients: ingredientsArray,
            appliance: appliancesArray,
            utensils: utensilsArray,
        };
        // console.log("advancedFiltersObject :", advancedFiltersObject);
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
                !appliance.length || appliance.includes(recipe.appliance);
            const hasUtensils = utensils.every((utensil) =>
                recipe.utensils.includes(utensil)
            );

            return hasAppliance && hasIngredients && hasUtensils;
        });
    }

    updateAdvancedFilters(filters) {
        this.newFilteredData = this.updateFilteredRecipes(filters);
        const advancedFilters = this.getAdvancedFilters();
        return advancedFilters;
    }
}
