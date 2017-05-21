import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';

export const SET_LOADING = 'SET_LOADING',
             SEARCH_INGREDIENT = 'SEARCH_INGREDIENT',
             SEARCH_INGREDIENT_SUCCESS = 'SEARCH_INGREDIENT_SUCCESS',
             SEARCH_INGREDIENT_FAIL = 'SEARCH_INGREDIENT_FAIL',
             CLEAR_SEARCH = 'CLEAR_SEARCH',
             SEARCH_INGREDIENT_DETAILS = 'SEARCH__INGREDIENT_DETAILS',
             SEARCH_INGREDIENT_DETAILS_SUCCESS = 'SEARCH__INGREDIENT_DETAILS_SUCCESS',
             SEARCH_INGREDIENT_DETAILS_FAILED = 'SEARCH__INGREDIENT_DETAILS_FAILED',
             SET_LOADING_DETAILS = 'SET_LOADING_DETAILS';

@Injectable()
export class IngredientActions {

  searchIngredient(name: string, page: number): Action {
    return {
      type: SEARCH_INGREDIENT,
      payload: {
        name,
        page
      }
    };
  }

  searchSuccess(data: any): Action {
    return {
      type: SEARCH_INGREDIENT_SUCCESS,
      payload: data
    };
  }

  searchFailed(error: Error): Action {
    return {
      type: SEARCH_INGREDIENT_FAIL,
      payload: error
    };
  }

  clearSearch(): Action {
    return {
      type: CLEAR_SEARCH
    };
  }

  setLoading(isLoading: boolean): Action {
    return {
      type: SET_LOADING,
      payload: isLoading
    };
  }

  setLoadingDetails(isLoading: boolean): Action {
    return {
      type: SET_LOADING_DETAILS,
      payload: isLoading
    };
  }

  searchIngredientDetails(ndbno: string): Action {
    return {
      type: SEARCH_INGREDIENT_DETAILS,
      payload: ndbno
    };
  }

  searchDetailsSuccess(data: any): Action {
    return {
      type: SEARCH_INGREDIENT_DETAILS_SUCCESS,
      payload: data
    };
  }

  searchDetailsFailed(error: Error): Action {
    return {
      type: SEARCH_INGREDIENT_DETAILS_FAILED,
      payload: error
    };
  }
}
