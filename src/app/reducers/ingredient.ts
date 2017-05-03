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
  let item = state.details.item.map((item: any) => {
    if (item.ndbno === id) {
      return Object.assign({}, item, { loadingDetails: isLoading });
    } else {
      return item;
    }
  });
  return Object.assign({}, state, { details: { item } });
}
