import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { RecipeIngredient } from '../models/recipe';

export const SET_LOADING_RECIPE = 'SET_LOADING_RECIPE',
             ADD_INGREDIENT = 'ADD_INGREDIENT',
             REMOVE_INGREDIENT = 'REMOVE_INGREDIENT',
             CLEAR_INGREDIENT_LIST = 'CLEAR_INGREDIENT_LIST',
             SEARCH_RECIPE = 'SEARCH_RECIPE',
             SEARCH_RECIPE_SUCCESS = 'SEARCH_RECIPE_SUCCESS',
             SEARCH_RECIPE_FAILED = 'SEARCH_RECIPE_FAILED',
             SELECT_RECIPE = 'SELECT_RECIPE';

@Injectable()
export class RecipeActions {

  setLoading(isLoading: boolean): Action {
    return {
      type: SET_LOADING_RECIPE,
      payload: isLoading
    };
  }

  addIngredient(ingredient: RecipeIngredient): Action {
    return {
      type: ADD_INGREDIENT,
      payload: ingredient
    };
  }

  removeIngredient(ndbno: string): Action {
    return {
      type: REMOVE_INGREDIENT,
      payload: ndbno
    };
  }

  clearIngredientList(): Action {
    return {
      type: CLEAR_INGREDIENT_LIST
    };
  }

  searchRecipe(query: string, page: number = 1): Action {
    return {
      type: SEARCH_RECIPE,
      payload: { query, page }
    };
  }

  searchRecipeSuccess(data: any): Action {
    return {
      type: SEARCH_RECIPE_SUCCESS,
      payload: data
    };
  }

  searchRecipeFailed(error: string): Action {
    return {
      type: SEARCH_RECIPE_FAILED,
      payload: error
    };
  }

  selectRecipe(id: string): Action {
    return {
      type: SELECT_RECIPE,
      payload: id
    };
  }
}
