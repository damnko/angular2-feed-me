import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { AppState } from './../models/app-state';

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
  constructor(private store: Store<AppState>) {}

  public searchIngredient(name: string): Action {
    return {
      type: SEARCH_INGREDIENT,
      payload: name
    };
  }

  public searchSuccess(data: any): Action {
    return {
      type: SEARCH_INGREDIENT_SUCCESS,
      payload: data
    };
  }

  public searchFailed(error: string): Action {
    return {
      type: SEARCH_INGREDIENT_FAIL,
      payload: error
    };
  }

  public clearSearch(): Action {
    return {
      type: CLEAR_SEARCH
    };
  }

  public setLoading(isLoading: boolean): Action {
    return {
      type: SET_LOADING,
      payload: isLoading
    };
  }

  public setLoadingDetails(isLoading: boolean): Action {
    return {
      type: SET_LOADING_DETAILS,
      payload: isLoading
    };
  }

  public searchIngredientDetails(ndbno: string): Action {
    return {
      type: SEARCH_INGREDIENT_DETAILS,
      payload: ndbno
    };
  }

  public searchDetailsSuccess(data: any): Action {
    return {
      type: SEARCH_INGREDIENT_DETAILS_SUCCESS,
      payload: data
    };
  }

  public searchDetailsFailed(error: string): Action {
    return {
      type: SEARCH_INGREDIENT_DETAILS_FAILED,
      payload: error
    };
  }
}
