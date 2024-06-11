export class AdvancedFilters {
    constructor(data) {
        this.data = data;
        this.navFilter = document.getElementById("filter-research");
    }

    async render() {
        this.data.forEach((item) => {
            const key = Object.keys(item)[0];
            const value = item[key];
            this[key] = key;

            this.navFilter.innerHTML += `
                <div class="filter-container col-12 col-sm-3 col-md-3 col-lg-2 mb-3" id="filter-by-${key}">
                    <button class="custom-select btn" id="custom-select-${key}" aria-haspopup="listbox" aria-expanded="false" aria-label="Ouvre le menu déroulant de tri par ${value}">
                        ${value}<img src="./assets/img/icons/up-arrow.svg" alt="flèche indiquant l'état du menu" class="up-arrow" />
                    </button>
                    <datalist class="dropdown-content list-group" id="datalist-${key}" aria-labelledby="custom-select-${key}" style="display: none">
                        <span id="search-${key}" class="search">
                            <input type="search" id="input-${key}" class="form-control" placeholder="" aria-label="Rechercher un ${value}" />
                            <img class="close" src="./assets/img/icons/close.svg" alt="Reset search" />
                            <button type="submit">
                                <i class="bi bi-search"></i>
                            </button>
                        </span>
                    </datalist>
                </div>
            `;
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

            const input = dropdownContent.querySelector(".search input");
            const closeButton = dropdownContent.querySelector(".search .close");
            const submit = dropdownContent.querySelector(
                ".search button[type=submit]"
            );

            input.addEventListener("input", () => {
                closeButton.style.display = input.value ? "block" : "none";
                this.filterInput(input, dropdownContent);
            });

            input.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    submit.click();
                }
            });

            submit.addEventListener("click", (event) => {
                event.preventDefault();
                input.value = "";
                closeButton.style.display = "none";
                this.filterInput(input, dropdownContent);
            });

            closeButton.addEventListener("click", () => {
                input.value = "";
                input.focus();
                closeButton.style.display = "none";
                this.filterInput(input, dropdownContent);
            });
        });
    }

    filterInput(input, datalist) {
        const inputValue = input.value.toLowerCase();
        const options = datalist.querySelectorAll(
            ".list-group-item.filter-item"
        );

        options.forEach((option) => {
            option.style.display =
                inputValue.length < 3 ||
                option.textContent.toLowerCase().includes(inputValue)
                    ? ""
                    : "none";
        });
    }
}

export async function filtersButtons(advancedSearch) {
    const navFilter = document.getElementById("filter-research");
    navFilter.innerHTML = "";
    const filterMapper = new AdvancedFilters(advancedSearch);
    return filterMapper.render();
}
