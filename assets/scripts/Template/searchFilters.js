export class FilterTemplate {
    constructor(data) {
        this.data = data;
        this.navFilter = document.getElementById("filter-research");
        this.selectedFilters = {
            ingrédients: new Set(),
            appareils: new Set(),
            ustensiles: new Set(),
        };
    }

    getDataValues(field) {
        const items = new Set();
        this.data.forEach((recipe) => {
            if (Array.isArray(recipe[field])) {
                recipe[field].forEach((item) => {
                    const itemName = item.ingredient
                        ? item.ingredient.toLowerCase()
                        : item.toLowerCase();
                    items.add(itemName);
                });
            } else {
                items.add(recipe[field].toLowerCase());
            }
        });
        console.log(items);
        return Array.from(items);
    }
    getIngredients() {
        return this.getDataValues("ingredients");
    }

    getAppliances() {
        return this.getDataValues("appliance");
    }

    getUtensils() {
        return this.getDataValues("utensils");
    }

    titleExample() {
        const title = document.createElement("h2");
        title.className = "col-12 col-md-auto col-lg-5 text-md-end text-center";
        const recipeCount = this.data.length;
        title.innerText = `${recipeCount} recette${
            recipeCount !== 1 ? "s" : ""
        }`;

        return title;
    }

    createDropdown(title, items) {
        const type = title.toLowerCase();

        const container = document.createElement("div");
        container.className =
            "filter-container col-12 col-sm-3 col-md-3 col-lg-2 mb-3";
        container.id = `filter-by-${type}`;

        const button = document.createElement("button");
        button.className = "custom-select btn";
        button.id = `custom-select-${type}`;
        button.setAttribute("aria-haspopup", "listbox");
        button.setAttribute("aria-expanded", "false");
        button.setAttribute(
            "aria-label",
            `Ouvre le menu déroulant de tri par ${type}`
        );
        button.innerHTML = `${title}<img src="./assets/img/icons/up-arrow.svg" alt="flèche indiquant l'état du menu" class="up-arrow" />`;

        const datalist = document.createElement("datalist");
        datalist.className = "dropdown-content list-group";
        datalist.id = `datalist-${type}`;
        datalist.setAttribute("aria-labelledby", `custom-select-${type}`);

        const searchSpan = document.createElement("span");
        searchSpan.id = `search-${type}`;
        searchSpan.className = "search";
        searchSpan.innerHTML = `
            <input type="search" class="form-control" placeholder="" aria-label="Rechercher un ${type}" />
            <img class="close" src="./assets/img/icons/close.svg" alt="Reset search" />
            <button type="submit"><i class="bi bi-search"></i></button>
        `;
        datalist.appendChild(searchSpan);

        items.forEach((item) => {
            const option = document.createElement("option");
            option.className = "list-group-item filter-item";
            option.setAttribute("data-filter", item);
            option.setAttribute("aria-checked", "false");
            option.tabIndex = 0;
            option.textContent = item;
            option.addEventListener("click", () =>
                this.selectFilter(item, option, datalist)
            );
            datalist.appendChild(option);
        });

        container.appendChild(button);
        container.appendChild(datalist);
        return container;
    }

    selectFilter(item, optionElement, datalist) {
        optionElement.remove();

        const selectedSpan = document.createElement("span");
        selectedSpan.className = "list-group-item tag-item";
        selectedSpan.setAttribute("role", "option");
        selectedSpan.setAttribute("data-filter", item);
        selectedSpan.setAttribute("aria-checked", "true");
        selectedSpan.tabIndex = 0;
        selectedSpan.textContent = item;
        selectedSpan.innerHTML += `<button class="close" type="button" tabindex="-1"><img src="./assets/img/icons/closeYellow.svg" alt="Reset" /></button>`;
        selectedSpan
            .querySelector(".close")
            .addEventListener("click", () =>
                this.removeFilter(item, selectedSpan, datalist)
            );

        const selectedContainer = datalist.querySelector(".search");
        selectedContainer.after(selectedSpan);
    }

    removeFilter(item, selectedSpan, datalist) {
        selectedSpan.remove();

        const option = document.createElement("option");
        option.className = "list-group-item filter-item";
        option.setAttribute("data-filter", item);
        option.setAttribute("aria-checked", "false");
        option.tabIndex = 0;
        option.textContent = item;
        option.addEventListener("click", () =>
            this.selectFilter(item, option, datalist)
        );

        datalist.appendChild(option);
    }

    listener(title) {
        const type = title.toLowerCase();

        const selectButton = document.getElementById(`custom-select-${type}`);
        const selectedContainer = document.getElementById(`filter-by-${type}`);
        const dropdownContent = document.getElementById(`datalist-${type}`);
        const upArrow = selectButton.querySelector(".up-arrow");

        selectButton.addEventListener("click", () => {
            const isOpen = dropdownContent.style.display === "block";
            selectedContainer.classList.toggle("active");
            dropdownContent.style.display = isOpen ? "none" : "block";
            upArrow.classList.toggle("down-arrow", !isOpen);
        });

        window.addEventListener("click", (event) => {
            if (
                !event.target.closest(`#filter-by-${type}`) &&
                !event.target.closest(".list-group-item")
            ) {
                dropdownContent.style.display = "none";
                selectedContainer.classList.remove("active");
                upArrow.classList.remove("down-arrow");
            }
        });

        const input = dropdownContent.querySelector(".search input");
        const closeButton = dropdownContent.querySelector(".search .close");

        input.addEventListener("input", function () {
            closeButton.style.display = input.value ? "block" : "none";
        });

        closeButton.addEventListener("click", function () {
            input.value = "";
            input.focus();
            closeButton.style.display = "none";
        });
    }

    render() {
        const ingredients = this.getIngredients();
        const appliances = this.getAppliances();
        const utensils = this.getUtensils();
        const title = this.titleExample();

        const ingredientFilter = this.createDropdown(
            "Ingrédients",
            ingredients
        );
        const applianceFilter = this.createDropdown("Appareils", appliances);
        const ustensilFilter = this.createDropdown("Ustensiles", utensils);

        this.navFilter.append(
            ingredientFilter,
            applianceFilter,
            ustensilFilter,
            title
        );

        this.listener("Ingrédients");
        this.listener("Appareils");
        this.listener("Ustensiles");
    }
    updateFilter() {
        this.navFilter.innerHTML = "";
    }
}
