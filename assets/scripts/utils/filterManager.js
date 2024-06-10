export function getActiveFilters() {
    return (
        JSON.parse(sessionStorage.getItem("filters")) || {
            ingredients: [],
            appliance: [],
            utensils: [],
        }
    );
}

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
        if (query.length < 3) {
            this.filteredData = this.originalData;
        } else {
            const loweredQuery = query.toLowerCase();
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
        // this.filteredData = this.applyFilters(this.filteredData);
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

        const appliances = new Set();
        this.newFilteredData.forEach((item) => {
            appliances.add(item.appliance);
        });
        const appliancesArray = Array.from(appliances);

        const utensils = new Set();
        this.newFilteredData.forEach((recipe) => {
            recipe.utensils.forEach((utensil) => {
                utensils.add(utensil);
            });
        });
        const utensilsArray = Array.from(utensils);

        const advancedFiltersObject = {
            ingredients: ingredientsArray,
            appliances: appliancesArray,
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
                !appliance.length || appliance.includes(recipe.appliance);
            const hasUtensils = utensils.every((utensil) =>
                recipe.utensils.includes(utensil)
            );

            return hasIngredients && hasAppliance && hasUtensils;
        });
    }

    updateAdvancedFilters(filters) {
        this.newFilteredData = this.updateFilteredRecipes(filters);
        const advancedFilters = this.getAdvancedFilters();
        return advancedFilters;
    }

    updateView() {
        // new FilterTemplate(this.filteredData).updateFilter();
        // new RecipeCard(this.filteredData).updateRecipes();
        // new Title(this.filteredData).updateTitle();
    }
}