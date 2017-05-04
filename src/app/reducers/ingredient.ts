import { Action } from '@ngrx/store';
import { Ingredient } from '../models/ingredient';

import {
  SET_LOADING,
  SEARCH_INGREDIENT,
  SEARCH_INGREDIENT_SUCCESS,
  SEARCH_INGREDIENT_FAIL,
  SET_LOADING_DETAILS,
  SEARCH_INGREDIENT_DETAILS,
  SEARCH_INGREDIENT_DETAILS_SUCCESS,
  SEARCH_INGREDIENT_DETAILS_FAILED,
  CLEAR_SEARCH
} from '../actions/ingredient-action';

export function ingredient(state: Ingredient, action: Action): Ingredient {
  switch (action.type) {
    case SET_LOADING:
      return Object.assign({}, state, { loading: action.payload });
    case SEARCH_INGREDIENT:
      return Object.assign({}, state, { searchTerm: action.payload, error: null });
    case SEARCH_INGREDIENT_SUCCESS:
      return Object.assign({}, state, { details: action.payload });
    case SEARCH_INGREDIENT_FAIL:
      return Object.assign({}, state, { error: action.payload, details: null });
    case CLEAR_SEARCH:
      return Object.assign({}, state, { searchTerm: '', details: null });
    case SET_LOADING_DETAILS:
      return Object.assign({}, state, { loadingDetails: action.payload });
    case SEARCH_INGREDIENT_DETAILS:
      return setIngredientLoadingState(state, action.payload, true);
    case SEARCH_INGREDIENT_DETAILS_SUCCESS:
      state = setIngredientLoadingState(state, action.payload.report.food.ndbno, false);
      return Object.assign({}, state, { selectedIngredient: action.payload });
    case SEARCH_INGREDIENT_DETAILS_FAILED:
      return Object.assign({}, state, { detailsError: action.payload });
    default:
      return state;
  }
}

function setIngredientLoadingState(state: Ingredient, id: string, isLoading: boolean) {
  const item = state.details.item.map((el: any) => {
    if (el.ndbno === id) {
      return Object.assign({}, el, { loadingDetails: isLoading });
    } else {
      return el;
    }
  });
  return Object.assign({}, state, { details: { item } });
}
