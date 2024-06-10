import { recipes } from "../data/recipes.js";
import { filtersButtons } from "./Template/advancedFilters.js";
import {
    RecipeFilter,
    getActiveFilters,
} from "../scripts/utils/filterManager.js";

import { AdvancedOptions } from "./Template/advancedOptions.js";
import { RecipeCard } from "./Template/recipesCards.js";
import { Title } from "./Template/titleTemplate.js";

// Reset advanced filters on reload
sessionStorage.removeItem("filters");

// Initialize a single instance of RecipeFilter
const filters = getActiveFilters();
const recipeFilter = new RecipeFilter(recipes);
let updateFilteredRecipes = recipeFilter.updateFilteredRecipes(filters);
let options = recipeFilter.updateAdvancedFilters(filters);

// Initialize instance of advanced filters buttons
const advancedSearch = [
    { ingredients: "Ingrédients" },
    { appliances: "Appareils" },
    { utensils: "Ustensiles" },
];
filtersButtons(advancedSearch);
const advancedOptions = new AdvancedOptions(advancedSearch, options);
// Initialize instance of title
new Title(updateFilteredRecipes).render();

// Initialize instance of recipes cards
const recipeCard = new RecipeCard(recipeFilter.newFilteredData);
recipeCard.updateRecipes(recipeFilter.newFilteredData);

// Event listeners for input and buttons
const input = document.querySelector("form input");
const closeButton = document.querySelector("form .close");
const submit = document.querySelector("form button[type=submit]");
const navFilter = document.getElementById("filter-research");

input.addEventListener("input", () => {
    closeButton.style.display = "block";
});

closeButton.addEventListener("click", () => {
    input.value = "";
    input.focus();
    closeButton.style.display = "none";
    recipeFilter.mainFilterRecipes("");
});

submit.addEventListener("click", (event) => {
    event.preventDefault();
    const query = input.value.trim();
    let queryRecipes = recipeFilter.mainFilterRecipes(query);
    new RecipeCard(queryRecipes).updateRecipes(queryRecipes);
    new Title(queryRecipes).updateTitle();
    input.value = "";
    sessionStorage.removeItem("filters");
});

// Update advanced filters and recipes
navFilter.addEventListener("click", () => {
    const filters = getActiveFilters();
    console.log("filters :", filters);
    let updateFilteredRecipes = recipeFilter.updateFilteredRecipes(filters);
    console.log("updateFilteredRecipes :", updateFilteredRecipes);
    let updateAdvancedFilters = recipeFilter.updateAdvancedFilters(filters);
    console.log("updateAdvancedFilters :", updateAdvancedFilters);

    new RecipeCard(updateFilteredRecipes).updateRecipes(updateFilteredRecipes);
    new Title(updateFilteredRecipes).updateTitle();
});
