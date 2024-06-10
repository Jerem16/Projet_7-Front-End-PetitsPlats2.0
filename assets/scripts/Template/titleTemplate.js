export class Title {
    constructor(data) {
        this.data = data;
        this.navFilter = document.getElementById("filter-research");
    }

    title() {
        const title = document.createElement("h2");
        title.className = "col-12 col-md-auto col-lg-5 text-md-end text-center";
        title.id = "nb-recipes";
        const recipeCount = this.data.length;
        if (recipeCount === 0) {
            title.innerText = `Aucune recette n'a été trouvée`;
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
