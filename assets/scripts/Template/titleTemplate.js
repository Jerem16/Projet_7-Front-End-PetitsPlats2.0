import { get_SStorage } from "../utils/sessionStorage.js";
export class Title {
    constructor(data) {
        this.data = data;
        this.navFilter = document.getElementById("filter-research");
        this.tagFilter = document.getElementById("tag-filter");
    }

    title() {
        const title = document.createElement("h2");
        title.className = "col-12 col-md-auto col-lg-5 text-md-end text-center";
        title.id = "nb-recipes";
        const recipeCount = this.data.length;
        if (recipeCount === 0) {
            this.alert();
        }
        title.innerText = `${recipeCount} recette${
            recipeCount !== 1 ? "s" : ""
        }`;

        return this.navFilter.appendChild(title);
    }

    alert() {
        const title = document.createElement("h2");
        title.className = "col-12 col-md-auto text-center";
        title.id = "alert";
        const recipeCount = this.data.length;
        if (recipeCount === 0) {
            const mainFilter = get_SStorage();
            title.innerHTML = `Aucune recette ne contient "${mainFilter.main[0]}". <br> Vous pouvez chercher  « tarte aux pommes », « poisson », etc. `;
            title.classList.add("text");
            this.tagFilter.innerHTML = "";
        } else {
            title.remove();
        }
        return this.tagFilter.appendChild(title);
    }

    render() {
        this.title();
    }

    updateTitle() {
        const oldTitle = document.getElementById("nb-recipes");
        if (oldTitle) {
            oldTitle.remove();
        }
        this.title();
    }
}
