export class AdvancedOptions {
    constructor(id, options) {
        this.id = id;
        this.options = options;
        this.initFilters();
    }

    initFilters() {
        this.id.forEach((filter) => {
            const key = Object.keys(filter)[0];
            const datalist = document.getElementById(`datalist-${key}`);
            const searchSpan = datalist.querySelector(".search");
            this.options[key].forEach((item) => {
                this.addFilterOption(item, datalist, key);
            });
        });
    }

    addSelectedFilter(item, searchSpan, datalist, key) {
        const selectedSpan = this.createFilterSpan(item);
        searchSpan.after(selectedSpan);
        this.addRemoveFilterListener(selectedSpan, item, datalist, key);
    }

    addFilterOption(item, datalist, key) {
        const option = this.createFilterOption(item);
        datalist.appendChild(option);
        option.addEventListener("click", () => {
            this.selectFilter(item, option, datalist, key);
        });
    }

    createFilterSpan(item) {
        const selectedSpan = document.createElement("span");
        selectedSpan.className = "list-group-item tag-item";
        selectedSpan.setAttribute("role", "option");
        selectedSpan.setAttribute("data-filter", item);
        selectedSpan.setAttribute("aria-checked", "true");
        selectedSpan.tabIndex = 0;
        selectedSpan.textContent = item;
        selectedSpan.innerHTML += `<button class="close" type="button" tabindex="-1"><img src="./assets/img/icons/closeYellow.svg" alt="Reset" /></button>`;
        return selectedSpan;
    }

    createFilterOption(item) {
        const option = document.createElement("option");
        option.className = "list-group-item filter-item";
        option.setAttribute("data-filter", item);
        option.setAttribute("aria-checked", "false");
        option.tabIndex = 0;
        option.textContent = item;
        return option;
    }

    selectFilter(item, option, datalist, key) {
        const searchSpan = datalist.querySelector(".search");
        this.addSelectedFilter(item, searchSpan, datalist, key);
        option.remove();
        const selectedFilters = this.updateSelectedFilters(key, item);
        this.updateFilter(selectedFilters);
    }

    addRemoveFilterListener(selectedSpan, item, datalist, key) {
        const closeButton = selectedSpan.querySelector(".close");
        closeButton.addEventListener("click", () => {
            this.removeFilter(item, selectedSpan, datalist, key);
        });
    }

    removeFilter(item, selectedSpan, datalist, key) {
        selectedSpan.remove();
        this.addFilterOption(item, datalist, key);
        const selectedFilters = this.removeSelectedFilter(key, item);
        this.updateFilter(selectedFilters);
    }

    updateSelectedFilters(type, item) {
        const selectedFilters = JSON.parse(
            sessionStorage.getItem("filters")
        ) || { ingredients: [], appliances: [], utensils: [] };
        if (!selectedFilters[type].includes(item)) {
            selectedFilters[type].push(item);
        }
        sessionStorage.setItem("filters", JSON.stringify(selectedFilters));
        return selectedFilters;
    }

    removeSelectedFilter(type, item) {
        const selectedFilters = JSON.parse(
            sessionStorage.getItem("filters")
        ) || { ingredients: [], appliances: [], utensils: [] };
        const index = selectedFilters[type].indexOf(item);
        if (index !== -1) {
            selectedFilters[type].splice(index, 1);
        }
        sessionStorage.setItem("filters", JSON.stringify(selectedFilters));
        return selectedFilters;
    }

    updateFilter(selectedFilters) {
        // const filteredRecipes = window.filterRecipes(
        //     window.recipes,
        //     selectedFilters
        // );
        // new RecipeCard(filteredRecipes).updateRecipes(filteredRecipes);
        // new Title(filteredRecipes).updateTitle();
    }
}