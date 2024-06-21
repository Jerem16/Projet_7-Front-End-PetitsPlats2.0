export class AdvancedFilters {
    constructor(data) {
        this.data = data;
        this.navFilter = document.getElementById("filter-research");
        this.template = document.getElementById("filter-template").content;
    }

    async render() {
        this.data.forEach((item) => {
            const key = Object.keys(item)[0];
            const value = item[key];

            // Clone le template
            const clone = document.importNode(this.template, true);
            const container = clone.querySelector(".filter-container");
            const button = container.querySelector(".custom-select");
            const span = container.querySelector(".filter-value");
            const datalist = container.querySelector(".dropdown-content");
            const input = container.querySelector("input");

            container.id = `filter-by-${key}`;
            button.id = `custom-select-${key}`;
            button.setAttribute(
                "aria-label",
                `Ouvre le menu déroulant de tri par ${value}`
            );
            span.textContent = value;
            datalist.id = `datalist-${key}`;
            datalist.setAttribute("aria-labelledby", `custom-select-${key}`);
            input.id = `input-${key}`;
            input.setAttribute("aria-label", `Rechercher un ${value}`);

            this.navFilter.appendChild(clone);
        });

        this.addListeners();
    }

    addListeners() {
        this.data.forEach((item) => {
            const key = Object.keys(item)[0];

            const selectButton = document.getElementById(
                `custom-select-${key}`
            );
            const selectedContainer = document.getElementById(
                `filter-by-${key}`
            );
            const dropdownContent = document.getElementById(`datalist-${key}`);
            const upArrow = selectButton.querySelector(".up-arrow");

            selectButton.addEventListener("click", () => {
                const isOpen = dropdownContent.style.display === "block";
                selectedContainer.classList.toggle("active");
                dropdownContent.style.display = isOpen ? "none" : "block";
                upArrow.classList.toggle("down-arrow", !isOpen);
            });

            window.addEventListener("click", (event) => {
                if (
                    !event.target.closest(`#filter-by-${key}`) &&
                    !event.target.closest(".list-group-item")
                ) {
                    dropdownContent.style.display = "none";
                    selectedContainer.classList.remove("active");
                    upArrow.classList.remove("down-arrow");
                }
            });
        });
    }
}

export async function filtersButtons(advancedSearch) {
    const navFilter = document.getElementById("filter-research");
    navFilter.innerHTML = "";
    const filterMapper = new AdvancedFilters(advancedSearch);
    return filterMapper.render();
}
