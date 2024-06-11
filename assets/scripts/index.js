import { recipes } from "../data/recipes.js";
import { filtersButtons } from "./Template/advancedFilters.js";
import { RecipeFilter } from "../scripts/utils/filterManager.js";
import { AdvancedOptions } from "./Template/advancedOptions.js";
import { RecipeCard } from "./Template/recipesCards.js";
import { Title } from "./Template/titleTemplate.js";
import { get_SStorage, remove_SStorage } from "./utils/sessionStorage.js";

// Reset advanced filters on reload
remove_SStorage();

// Initialize a single instance of RecipeFilter
const filters = get_SStorage();
const recipeFilter = new RecipeFilter(recipes);
let updateFilteredRecipes = recipeFilter.updateFilteredRecipes(filters);
let options = recipeFilter.updateAdvancedFilters(filters);

// Initialize instance of advanced filters buttons
const advancedSearch = [
    { ingredients: "Ingrédients" },
    { appliance: "Appareils" },
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
// Selector
const input = document.querySelector("form input");
const closeButton = document.querySelector("form .close");
const submit = document.querySelector("form button[type=submit]");
const navFilter = document.getElementById("filter-research");
// Event listeners
input.addEventListener("input", () => {
    closeButton.style.display = "block";
});

function resetButton() {
    input.value = "";
    input.focus();
    closeButton.style.display = "none";
}

closeButton.addEventListener("click", () => {
    resetButton();
    recipeFilter.mainFilterRecipes("");
});

submit.addEventListener("click", (event) => {
    event.preventDefault();
    const query = input.value.trim();
    let recipes = recipeFilter.mainFilterRecipes(query);
    filtersButtons(advancedSearch);
    new AdvancedOptions(advancedSearch, options).initFilters();
    new RecipeCard(recipes).updateRecipes(recipes);
    new Title(recipes).render();
    resetButton();
});

// Update advanced filters and recipes
navFilter.addEventListener("click", () => {
    const filters = get_SStorage();
    console.log("filters :", filters);
    let updateFilteredRecipes = recipeFilter.updateFilteredRecipes(filters);
    let selectedFilters = recipeFilter.updateAdvancedFilters(filters);
    advancedOptions.updateFilter(selectedFilters);
    new RecipeCard(updateFilteredRecipes).updateRecipes(updateFilteredRecipes);
    new Title(updateFilteredRecipes).updateTitle();
});
