import { Ingredient } from '../models/ingredient';
import { Action } from '@ngrx/store';

import {
  SET_LOADING,
  SEARCH_INGREDIENT,
  SEARCH_INGREDIENT_SUCCESS,
  SEARCH_INGREDIENT_FAIL,
  SET_LOADING_DETAILS,
  SEARCH_INGREDIENT_DETAILS,
  SEARCH_INGREDIENT_DETAILS_SUCCESS,
  SEARCH_INGREDIENT_DETAILS_FAILED
} from '../actions/ingredient-action';

export function ingredient(state: Ingredient, action: Action): Ingredient {
  switch (action.type) {
    case SET_LOADING:
      return Object.assign({}, state, { loading: action.payload });
    case SEARCH_INGREDIENT:
      return Object.assign({}, state, { searchTerm: action.payload });
    case SEARCH_INGREDIENT_SUCCESS:
      return Object.assign({}, state, { details: action.payload });
    case SEARCH_INGREDIENT_FAIL:
      return Object.assign({}, state, { error: action.payload });
    case SET_LOADING_DETAILS:
      return Object.assign({}, state, { loadingDetails: action.payload });
    case SEARCH_INGREDIENT_DETAILS_SUCCESS:
      console.log('payload is', action.payload);
      return Object.assign({}, state, { selectedIngredient: action.payload });
    case SEARCH_INGREDIENT_DETAILS_FAILED:
      return Object.assign({}, state, { detailsError: action.payload });
    default:
      return state;
  }
}
