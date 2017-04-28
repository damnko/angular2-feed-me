import {
  SET_LOADING,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SEARCH_RECIPE_SUCCESS
} from './../actions/recipe-actions';
import { Recipe } from './../models/recipe';
import { Action } from '@ngrx/store';

export function recipe(state: Recipe, action: Action): Recipe {
  switch (action.type) {
    case SET_LOADING:
      return Object.assign({}, state, { loading: action.payload });
    case ADD_INGREDIENT:
      const ingredientsInc = new Map(state.ingredients).set(action.payload.ndbno, action.payload);
      const newState = Object.assign({}, state, { ingredients: ingredientsInc });
      return newState;
    case REMOVE_INGREDIENT:
      const ingredientsDec = new Map(state.ingredients);
      ingredientsDec.delete(action.payload);
      return Object.assign({}, state, { ingredients: ingredientsDec });
    case SEARCH_RECIPE_SUCCESS:
      return Object.assign({}, state, { recipes: action.payload });
    default:
      return state;
  }
}
