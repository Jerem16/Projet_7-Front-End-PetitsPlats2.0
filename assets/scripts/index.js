import { recipes } from "../data/recipes.js";
import { FilterTemplate } from "./Template/searchFilters.js";
import { RecipeCard } from "./Template/recipesCards.js";

const input = document.querySelector("form input");
const closeButton = document.querySelector("form .close");
const submit = document.querySelector("form button[type=submit]");

input.addEventListener("input", function () {
    closeButton.style.display = "block";
});

closeButton.addEventListener("click", function () {
    input.value = "";
    input.focus();
    closeButton.style.display = "none";
    const filteredRecipes = filterRecipes("");
    recipeCard.updateRecipes(filteredRecipes);
});

submit.addEventListener("click", function (event) {
    event.preventDefault();
    const query = input.value.trim().toLowerCase();
    filterRecipes(query);
});

function filterRecipes(query) {
    if (query.length < 3) {
        return;
    } else {
        const filtered = recipes.filter((recipe) => {
            return (
                recipe.name.toLowerCase().includes(query) ||
                recipe.description.toLowerCase().includes(query) ||
                recipe.ingredients.some((ingredient) =>
                    ingredient.ingredient.toLowerCase().includes(query)
                )
            );
        });
        const filterTemplate = new FilterTemplate(filtered);
        filterTemplate.updateFilter();
        filterTemplate.render();
        recipeCard.updateRecipes(filtered);
        return filtered;
    }
}

const filterTemplate = new FilterTemplate(recipes);
filterTemplate.render();

const recipeCard = new RecipeCard(recipes);
recipeCard.render();
