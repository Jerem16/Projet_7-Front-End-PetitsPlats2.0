import { RecipeFilter } from "../index.js";
import { FilterTemplate } from "../Template/searchFilters.js";
import { RecipeCard } from "../Template/recipesCards.js";
import { Title } from "../Template/titleTemplate.js";

const recipeFilter = new RecipeFilter(recipes);
const filterTemplate = new FilterTemplate(recipeFilter.filteredData);
filterTemplate.render();
new Title(recipeFilter.filteredData).render();



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
    recipeFilter.mainFilterRecipes(query);
    input.value = "";
    sessionStorage.removeItem("filters");
});

navFilter.addEventListener("click", () => {
    const filters = getActiveFilters();
    console.log("filters :", filters);
    let updateFilteredRecipes = recipeFilter.updateFilteredRecipes(filters);
    console.log("updateFilteredRecipes :", updateFilteredRecipes);
    let updateAdvancedFilters = recipeFilter.updateAdvancedFilters(filters);
    console.log("updateAdvancedFilters :", updateAdvancedFilters);

    new FilterTemplate(updateFilteredRecipes);
    filterTemplate.updateFilter();
    new RecipeCard(updateFilteredRecipes).updateRecipes(updateFilteredRecipes);
    new Title(updateFilteredRecipes).updateTitle();
});
