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

class App {
    constructor() {
        this.filters = get_SStorage();
        this.data = new FilterManager(recipes);
        this.recipes = this.data.resetMainFilterRecipes();

        this.options = this.data.updateAdvancedOptions("");

        this.button = filtersButtons(advancedSearch);
        this.advancedOptions = new AdvancedOptions(
            advancedSearch,
            this.options
        );
        this.title = new Title(this.recipes);
        this.tag = new TagManager(this.filters);
        this.recipesCards = new RecipeCard(this.recipes);

        this.input = document.querySelector("form input");
        this.closeButton = document.querySelector("form .close");
        this.submit = document.querySelector("form button[type=submit]");
        this.navFilter = document.getElementById("filter-research");
        this.tagFilter = document.getElementById("tag-filter");

        this.start();
        this.addEventListeners();
    }

    start() {
        this.advancedOptions.initFilters();
        this.title.updateTitle();
        this.tag.renderUpdate();
        this.recipesCards.updateRecipes(this.recipes);
    }

    init() {
        this.filters = get_SStorage();
        const query = this.filters.main ? this.filters.main[0] : undefined;
        if (query === undefined) {
            this.data.resetMainFilterRecipes();
            this.update(this.filters);
        } else {
            this.update(this.filters);
        }
    }

    update(filters) {
        // this.button;

        const newRecipes = this.data.updateFilteredRecipes(filters);
        const newOptions = this.data.updateAdvancedOptions(filters);
        this.advancedOptions.updateFilter(newOptions);
        new RecipeCard(newRecipes).updateRecipes(newRecipes);
        const tagManager = new TagManager(filters);
        tagManager.renderUpdate();
        new Title(newRecipes).updateTitle();
    }

    noTag() {
        const newRecipes = this.data.updateFilteredRecipes(this.filters);
        const newOptions = this.data.updateAdvancedOptions(this.filters);
        this.advancedOptions.updateFilter(newOptions);
        new RecipeCard(newRecipes).updateRecipes(newRecipes);
        new Title(newRecipes).updateTitle();
    }

    resetTag() {
        this.filters = get_SStorage();
        remove_SStorage();
        new TagManager(this.filters).renderUpdate();
    }

    resetButton() {
        this.input.value = "";
        this.input.focus();
        this.closeButton.style.display = "none";
    }

    addEventListeners() {
        this.input.addEventListener("input", () => {
            this.closeButton.style.display = "block";
            const query = this.input.value.trim();
            if (query.length >= 3) {
                this.resetTag();
                this.submit.removeAttribute("disabled");
                this.data.mainFilterRecipes(query);
                filtersButtons(advancedSearch);
                new AdvancedOptions(advancedSearch, this.options).initFilters();
                this.noTag();
            } else {
                this.submit.setAttribute("disabled", "true");
            }
        });

        this.closeButton.addEventListener("click", () => {
            this.resetButton();
            this.data.resetMainFilterRecipes();
            this.resetTag();
            this.init();
        });

        this.submit.addEventListener("click", (event) => {
            event.preventDefault();
            const query = this.input.value.trim();
            this.data.mainFilterRecipes(query);
            filtersButtons(advancedSearch);
            new AdvancedOptions(advancedSearch, this.options).initFilters();
            this.init();
            this.resetButton();
        });

        this.navFilter.addEventListener("click", () => {
            this.init();
        });

        this.tagFilter.addEventListener("click", () => {
            this.init();
        });
    }
}

// Initialize the App
new App();
