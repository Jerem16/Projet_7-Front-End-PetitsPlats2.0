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
                        <span class="ingredient-name">${
                            ingredient.ingredient
                        }</span>
                        <span class="ingredient-quantity">${
                            ingredient.quantity ? ingredient.quantity + "" : ""
                        }${ingredient.unit ? ingredient.unit : ""}</span>
                    </div>
                `
            )
            .join("");
    }

    renderCard(recipe) {

        return `
            <article class="card recipe-card col-sm-10 col-lg-6 col-xl-3">
                <figure class="recipe-image">
                    <img class="w-100" src="./assets/img/Recettes/thumbnails/${
                        recipe.image
                    }" alt="Image de ${recipe.name}" />
                </figure>
                <h5 class="recipe-title">${recipe.name}</h5>
                <time class="badge recipe-time" datetime="PT${recipe.time}M">${
            recipe.time
        } min</time>

                <div class="recipe-content">
                    <section class="recipe-description">
                        <h6 class="recipe-subtitle">RECETTE</h6>
                        <p class="recipe-text">${recipe.description}</p>
                    </section>
                    <section class="recipe-ingredients">
                        <h6 class="recipe-subtitle">INGRÉDIENTS</h6>
                        <div class="row custom-row-gap">
                            ${this.renderIngredient(recipe.ingredients)}
                        </div>
                    </section>
                </div>
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
        recipes.forEach((recipe) => {
            const recipeElement = this.renderCard(recipe);
            this.container.innerHTML += recipeElement;
        });
    }
}
