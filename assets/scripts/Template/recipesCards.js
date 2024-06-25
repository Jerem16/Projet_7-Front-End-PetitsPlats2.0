import { capitalizeText } from "../utils/capitalise.js";
export class RecipeCard {
    constructor(recipes) {
        this.recipes = recipes;
        this.container = document.getElementById("recipes_cards");
    }

    renderIngredient(ingredients) {
        return ingredients
            .map(
                (ingredient) => `
                    <div class="col-md-5 ingredient-item">
                        <span class="ingredient-name">
                            ${ingredient.ingredient}
                        </span>
                        <span class="ingredient-quantity">
                            ${
                                ingredient.quantity
                                    ? ingredient.quantity + ""
                                    : ""
                            }
                            ${ingredient.unit ? ingredient.unit : ""}
                        </span>
                    </div>
                `
            )
            .join("");
    }
    // capitalizeSentences(text) {
    //     // Divise le texte en phrases en utilisant un point suivi d'un espace ou de la fin de la chaîne
    //     const sentences = text.split(/\. (?=[A-Za-z])|\.$/);

    //     // Capitalise la première lettre de chaque phrase
    //     const capitalizedSentences = sentences.map((sentence) => {
    //         return sentence.charAt(0).toUpperCase() + sentence.slice(1);
    //     });

    //     // Rejoint les phrases avec un point et un espace
    //     return capitalizedSentences.join(". ");
    // }
    updateScrollbarStyle(datalist) {
        if (datalist.scrollHeight > 307) {
            datalist.classList.add("scrollbar-modified");
        } else {
            datalist.classList.remove("scrollbar-modified");
        }
    }
    renderCard(recipe) {
        return `
            <article class="card recipe-card col-sm-10 col-lg-6 col-xl-3 m-auto"
            id="${recipe.id}"
            >
                <figure class="recipe-image">
                    <img class="w-100" 
                    src="./assets/img/recipes/thumbnails/${recipe.image}"
                    alt="${recipe.name}" 
                    width="380" 
                    height="253" 
                    />
                </figure>
                <h3 class="recipe-title">${recipe.name}</h3>
                <time class="badge recipe-time" datetime="PT${recipe.time}M">
                    ${recipe.time} min
                </time>
                <div class="recipe-content">
                    <section class="recipe-description">
                        <h4 class="recipe-subtitle">RECETTE</h4>
                        <p class="recipe-text">${capitalizeText(
                            recipe.description
                        )}</p>
                    </section>
                    <section class="recipe-ingredients">
                        <h5 class="recipe-subtitle">INGRÉDIENTS</h5>
                        <div class="row custom-row-gap">
                            ${this.renderIngredient(recipe.ingredients)}
                        </div>
                    </section>
                </div>
            </article>
        `;
    }
    lastElem() {
        return `
            <article class="card recipe-card col-sm-10 col-lg-6 col-xl-3 m-auto m-md-3" 
            id="last">
            </article>
        `;
    }
    render() {
        this.recipes.forEach((recipe) => {
            this.container.innerHTML += this.renderCard(recipe);
        });
    }

    updateRecipes(recipes) {
        this.container.innerHTML = "";
        this.recipes.forEach((recipe) => {
            const recipeElement = this.renderCard(recipe);
            this.container.innerHTML += recipeElement;
        });
        this.container.innerHTML += this.lastElem();
    }
}
