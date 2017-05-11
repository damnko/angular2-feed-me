import { Action } from '@ngrx/store';

import { Recipe, initialRecipe } from '../models';
import {
  SET_LOADING_RECIPE,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  CLEAR_INGREDIENT_LIST,
  SEARCH_RECIPE,
  SEARCH_RECIPE_SUCCESS,
  SELECT_RECIPE
} from '../actions';

export function recipe(state: Recipe = initialRecipe, action: Action): Recipe {
  switch (action.type) {
    case SET_LOADING_RECIPE:
      return Object.assign({}, state, { loadingRecipes: action.payload });
    case ADD_INGREDIENT:
      const ingredientsInc = new Map(state.ingredients).set(action.payload.ndbno, action.payload);
      const newState = Object.assign({}, state, { ingredients: ingredientsInc });
      return newState;
    case REMOVE_INGREDIENT:
      const ingredientsDec = new Map(state.ingredients);
      ingredientsDec.delete(action.payload);
      return Object.assign({}, state, { ingredients: ingredientsDec });
    case CLEAR_INGREDIENT_LIST:
      return Object.assign({}, state, { ingredients: new Map() });
    case SEARCH_RECIPE_SUCCESS:
      return Object.assign({}, state, { recipes: action.payload });
    case SELECT_RECIPE:
      const selectedRecipe = (action.payload === state.selectedRecipe) ? null : action.payload;
      return Object.assign({}, state, { selectedRecipe });
    default:
      return state;
  }
}
