import { AdvancedOptions } from "./advancedOptions.js";
import { FilterManager } from "../utils/filterManager.js";
import { recipes } from "../../data/recipes.js";
import { save_SStorage } from "../utils/sessionStorage.js";
export class TagManager extends AdvancedOptions {
    constructor(filters) {
        super();
        this.filters = filters;
        this.tagFilter = document.getElementById("tag-filter");
        this.filterManager = new FilterManager(recipes);
    }

    createTagBar() {
        const tagBar = document.createElement("div");
        tagBar.classList.add(
            "tag-bar",
            "d-flex",
            "flex-wrap",
            "flex-md-wrap",
            "col-12"
        );
        return tagBar;
    }

    createTag(tagName, filterType) {
        const tag = document.createElement("div");
        tag.classList.add("col-12", "col-sm-3", "col-md-3", "col-lg-2", "tag");
        tag.setAttribute("data-filter", filterType);
        tag.innerHTML = `
            <p>${tagName}</p>
            <button
                class="close"
                type="button"
                tabindex="-1"
                title="close"
            >
                <img
                    src="./assets/img/icons/closeTag.svg"
                    alt="reset tags"
                    width="14"
                    height="13"
                />
            </button>
        `;
        tag.querySelector(".close").addEventListener("click", () => {
            this.removeTag(tagName, filterType);
        });

        return tag;
    }

    removeTag(tagName, filterType) {
        this.filters[filterType] = this.filters[filterType].filter(
            (tag) => tag !== tagName
        );
        if (filterType === "main") {
            save_SStorage(this.filters);
            this.filterManager.resetMainFilterRecipes();
        } else {
            const datalist = document.getElementById(`datalist-${filterType}`);
            const selectedSpan = document.querySelector(
                `span[data-filter="${tagName}"]`
            );
            this.removeFilter(tagName, selectedSpan, datalist, filterType);
            console.log(tagName);
        }
        save_SStorage(this.filters);
        this.renderUpdate();
    }

    renderUpdate() {
        this.tagFilter.innerHTML = "";
        const tagBar = this.createTagBar();

        const { ingredients, appliance, utensils, main } = this.filters;

        ingredients.forEach((tagName) => {
            tagBar.appendChild(this.createTag(tagName, "ingredients"));
        });

        appliance.forEach((tagName) => {
            tagBar.appendChild(this.createTag(tagName, "appliance"));
        });

        utensils.forEach((tagName) => {
            tagBar.appendChild(this.createTag(tagName, "utensils"));
        });

        main.forEach((tagName) => {
            tagBar.appendChild(this.createTag(tagName, "main"));
        });

        this.tagFilter.appendChild(tagBar);
    }
    reset() {
        this.tagFilter.innerHTML = "";
    }
}