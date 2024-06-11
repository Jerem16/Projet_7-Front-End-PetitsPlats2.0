import { get_SStorage } from "../utils/sessionStorage.js";
export class Title {
    constructor(data) {
        this.data = data;
        this.navFilter = document.getElementById("filter-research");
        // this.title();
    }

    title() {
        const title = document.createElement("h2");
        title.className = "col-12 col-md-auto col-lg-5 text-md-end text-center";
        title.id = "nb-recipes";
        const recipeCount = this.data.length;
        if (recipeCount === 0) {
            const mainFilter = get_SStorage();
            console.log(mainFilter.main[0]);
            title.innerHTML = `Aucune recette ne contient "${mainFilter.main[0]}". <br> Vous pouvez chercher  « tarte aux pommes », « poisson », etc. `;
            title.classList.add("text");
        } else {
            title.innerText = `${recipeCount} recette${
                recipeCount !== 1 ? "s" : ""
            }`;
        }

        return title;
    }

    render() {
        const title = this.title();

        this.navFilter.appendChild(title);
    }

    updateTitle() {
        const oldTitle = document.getElementById("nb-recipes");
        if (oldTitle) {
            oldTitle.remove();
        }
        const title = document.createElement("h2");
        title.className = "col-12 col-md-auto col-lg-5 text-md-end text-center";
        title.id = "nb-recipes";
        let recipeCount = this.data.length;
        title.innerText = `${recipeCount} recette${
            recipeCount !== 1 ? "s" : ""
        }`;

        this.navFilter.appendChild(title);
    }
}
