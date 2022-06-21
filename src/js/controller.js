import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import recipeview from './views/recipeView.js';
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    // si no tenemos un id nose ejecuta nada, si si pues seguimos
    if (!id) return;
    recipeView.renderSpinner();
    // 1 Loading recipe
    await model.loadRecipe(id);
    // 2 Rendering recipe
    recipeview.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};
controlRecipes();
['haschange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
window.addEventListener('haschange', controlRecipes);
window.addEventListener('load', controlRecipes);
