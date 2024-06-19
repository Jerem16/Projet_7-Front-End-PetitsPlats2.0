import { recipes } from "../data/recipes.js";
import { filtersButtons } from "./Template/advancedFilters.js";
import { FilterManager } from "../scripts/utils/filterManager.js";
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

// Initialize a single instance of filterManager
const filters = get_SStorage();

const data = new FilterManager(recipes);
let options = data.updateAdvancedOptions("");

filtersButtons(advancedSearch);
const advancedOptions = new AdvancedOptions(advancedSearch, options);
advancedOptions.initFilters();

init();

function init() {
    const filters = get_SStorage();
    const query = filters.main[0];
    if (query === undefined) {
        data.resetMainFilterRecipes();
        update(filters);
    } else {
        update(filters);
    }
    function update(filters) {
        const newRecipes = data.updateFilteredRecipes(filters);
        let newOptions = data.updateAdvancedOptions(filters);
        advancedOptions.updateFilter(newOptions);
        new RecipeCard(newRecipes).updateRecipes(newRecipes);
        const tagManager = new TagManager(filters);
        tagManager.renderUpdate();
        new Title(newRecipes).updateTitle();
    }
}

function noTag() {
    const newRecipes = data.updateFilteredRecipes(filters);
    let newOptions = data.updateAdvancedOptions(filters);
    advancedOptions.updateFilter(newOptions);
    new RecipeCard(newRecipes).updateRecipes(newRecipes);
    new Title(newRecipes).updateTitle();
}
function resetTag() {
    const filters = get_SStorage();
    remove_SStorage();
    new TagManager(filters).renderUpdate();
}
// Event listeners for input and buttons
// Selector
const input = document.querySelector("form input");
const closeButton = document.querySelector("form .close");
const submit = document.querySelector("form button[type=submit]");
const navFilter = document.getElementById("filter-research");
const tagFilter = document.getElementById("tag-filter");

function resetButton() {
    input.value = "";
    input.focus();
    closeButton.style.display = "none";
}
// Event listeners
input.addEventListener("input", () => {
    closeButton.style.display = "block";
    const query = input.value.trim();
    if (query.length >= 3) {
        resetTag();
        submit.removeAttribute("disabled");
        data.mainFilterRecipes(query);
        filtersButtons(advancedSearch);
        new AdvancedOptions(advancedSearch, options).initFilters();
        noTag();
    } else {
        submit.setAttribute("disabled", "true");
    }
});

closeButton.addEventListener("click", () => {
    resetButton();
    data.resetMainFilterRecipes();
    resetTag();
    init();
});

submit.addEventListener("click", (event) => {
    event.preventDefault();
    const query = input.value.trim();
    data.mainFilterRecipes(query);
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
