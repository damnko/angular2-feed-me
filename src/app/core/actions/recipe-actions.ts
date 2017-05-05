import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { RecipeIngredient } from './../models/recipe';

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
  public setLoading(isLoading: boolean): Action {
    return {
      type: SET_LOADING_RECIPE,
      payload: isLoading
    };
  }

  public addIngredient(ingredient: RecipeIngredient): Action {
    return {
      type: ADD_INGREDIENT,
      payload: ingredient
    };
  }

  public removeIngredient(ndbno: string): Action {
    return {
      type: REMOVE_INGREDIENT,
      payload: ndbno
    };
  }

  public clearIngredientList(): Action {
    return {
      type: CLEAR_INGREDIENT_LIST
    };
  }

  public searchRecipe(query: string): Action {
    return {
      type: SEARCH_RECIPE,
      payload: query
    };
  }

  public searchRecipeSuccess(data: any): Action {
    return {
      type: SEARCH_RECIPE_SUCCESS,
      payload: data
    };
  }

  public searchRecipeFailed(error: string): Action {
    return {
      type: SEARCH_RECIPE_FAILED,
      payload: error
    };
  }

  public selectRecipe(id: string): Action {
    return {
      type: SELECT_RECIPE,
      payload: id
    };
  }
}
