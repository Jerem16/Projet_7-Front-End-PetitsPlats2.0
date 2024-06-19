import { get_SStorage, save_SStorage } from "../utils/sessionStorage.js";
import { escapeHTML } from "../utils/noXss.js";

export class AdvancedOptions {
    constructor(id, options) {
        this.id = id;
        this.options = options;
        this.filters = get_SStorage();
    }
    
    updateScrollbarStyle(datalist) {
        if (datalist.scrollHeight > 307) {
            datalist.classList.add("scrollbar-modified");
        } else {
            datalist.classList.remove("scrollbar-modified");
        }
    }

    initFilters() {
        this.id.forEach((filter) => {
            const key = Object.keys(filter)[0];
            const datalist = document.getElementById(`datalist-${key}`);

            if (!datalist) return;

            this.options[key].forEach((item) => {
                this.addFilterOption(item, datalist, key);
            });

            this.filters[key].forEach((item) => {
                this.getSelectedFilter(item, datalist, key);
            });

            // Adding event listeners
            const input = datalist.querySelector(".search input");
            const closeButton = datalist.querySelector(".search .close");
            const submit = datalist.querySelector(
                ".search button[type=submit]"
            );

            datalist.addEventListener("mouseover", () => {
                this.updateScrollbarStyle(datalist);
            });
            datalist.addEventListener("mouseout", () => {
                this.updateScrollbarStyle(datalist);
            });

            input.addEventListener("input", () => {
                closeButton.style.display = input.value ? "block" : "none";
                this.filterInput(input, datalist);
            });

            input.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    submit.click();
                }
            });

            submit.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
                this.filterInput(input, datalist);
                closeButton.style.display = "none";
                input.value = "";
            });

            closeButton.addEventListener("click", () => {
                input.value = "";
                input.focus();
                closeButton.style.display = "none";
                this.filterInput(input, datalist);
            });
        });
    }

    getSelectedFilter(item, datalist, key) {
        this.addSelectedFilter(
            item,
            datalist.querySelector(".search"),
            datalist,
            key
        );
        const removeOption = datalist.querySelector(
            `option[data-filter="${item}"]`
        );
        if (removeOption) {
            removeOption.remove();
        }
    }
    addSelectedFilter(item, searchSpan, datalist, key) {
        const input = datalist.querySelector(".search input");
        input.value = "";
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
        selectedSpan.setAttribute("data-visible", "true");
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
        option.setAttribute("data-visible", "true");
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
        const selectedFilters = get_SStorage();
        if (!selectedFilters[type].includes(item)) {
            selectedFilters[type].push(item);
        }
        save_SStorage(selectedFilters);
        return selectedFilters;
    }

    removeSelectedFilter(type, item) {
        const selectedFilters = get_SStorage();
        const index = selectedFilters[type].indexOf(item);
        if (index !== -1) {
            selectedFilters[type].splice(index, 1);
        }
        save_SStorage(selectedFilters);
        return selectedFilters;
    }

    updateFilter(selectedFilters) {
        ["ingredients", "appliance", "utensils"].forEach((key) => {
            const datalist = document.getElementById(`datalist-${key}`);
            const options = datalist.querySelectorAll(".filter-item");
            options.forEach((option) => {
                if (
                    selectedFilters[key].includes(
                        option.getAttribute("data-filter")
                    )
                ) {
                    option.style.display = "";
                    option.setAttribute("data-visible", "true");
                } else {
                    option.style.display = "none";
                    option.setAttribute("data-visible", "false");
                }
            });
        });
    }

    filterInput(input, datalist) {
        const inputValue = input.value.toLowerCase();
        const query = escapeHTML(inputValue);
        const options = datalist.querySelectorAll(
            'option[data-visible="true"]'
        );
        options.forEach((option) => {
            option.style.display =
                inputValue.length < 0 ||
                option.textContent.toLowerCase().includes(query)
                    ? ""
                    : "none";
        });
    }
}
