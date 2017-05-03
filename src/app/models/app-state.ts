import { Layout } from './layout';
import { Recipe } from './recipe';
import { Ingredient } from './ingredient';

export interface AppState {
  ingredient: Ingredient;
  recipe: Recipe;
  layout: Layout;
}

export const initialIngredient: Ingredient = {
  loading: false,
  searchTerm: '',
  details: null,
  error: null,
  loadingDetails: false,
  selectedIngredient: null,
  detailsError: null
};

export const initialRecipe: Recipe = {
  ingredients: new Map(),
  loadingRecipes: false,
  recipes: [],
  selectedRecipe: null
};

export const initialLayout: Layout = {
  sidebarOpened: false
};
