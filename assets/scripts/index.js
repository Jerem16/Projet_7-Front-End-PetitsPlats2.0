import { recipes } from "../data/recipesX.js";
import { filtersButtons } from "./Template/advancedFilters.js";
import { RecipeFilter } from "../scripts/utils/filterManager.js";
import { AdvancedOptions } from "./Template/advancedOptions.js";
import { TagManager } from "./Template/tagManager.js";
import { RecipeCard } from "./Template/recipesCards.js";
import { Title } from "./Template/titleTemplate.js";
import { get_SStorage, remove_SStorage } from "./utils/sessionStorage.js";
const advancedSearch = [
    { ingredients: "Ingrédients" },
    { appliance: "Appareils" },
    { utensils: "Ustensiles" },
];
// Reset advanced filters on reload
remove_SStorage();

// Initialize a single instance of RecipeFilter
const filters = get_SStorage();

const recipeFilter = new RecipeFilter(recipes);
let options = recipeFilter.updateAdvancedFilters(filters);

filtersButtons(advancedSearch);
const advancedOptions = new AdvancedOptions(advancedSearch, options);
advancedOptions.initFilters();

init();

function update(filters) {
    let updateFilteredRecipes = recipeFilter.updateFilteredRecipes(filters);
    let selectedFilters = recipeFilter.updateAdvancedFilters(filters);
    advancedOptions.updateFilter(selectedFilters);
    new RecipeCard(updateFilteredRecipes).updateRecipes(updateFilteredRecipes);
    new Title(updateFilteredRecipes).updateTitle();
    const tagManager = new TagManager(filters);
    tagManager.generateTags();
}
// Event listeners for input and buttons
// Selector
const input = document.querySelector("form input");
const closeButton = document.querySelector("form .close");
const submit = document.querySelector("form button[type=submit]");
const navFilter = document.getElementById("filter-research");
const tagFilter = document.getElementById("tag-filter");
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
    recipeFilter.mainFilterRecipes(query);
    filtersButtons(advancedSearch);
    new AdvancedOptions(advancedSearch, options).initFilters();
    init();
    resetButton();
});

// Update advanced filters and recipes
navFilter.addEventListener("click", () => {
    init();
});
tagFilter.addEventListener("click", () => {
    init();
});

function init() {
    const filters = get_SStorage();
    const query = filters.main[0];
    if (query === undefined) {
        recipeFilter.resetMainFilterRecipes();
        update(filters);
    } else {
        update(filters);
    }
}
