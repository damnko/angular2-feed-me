import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Recipe, AppState, RecipeIngredient, Ingredients } from '../models';

export function getRecipeState(store$: Store<AppState>): Observable<Recipe> {
  return store$.select((state: AppState) => state.recipe)
    .distinctUntilChanged();
}

export function getRecipeIngredients(store$: Store<AppState>): Observable<Ingredients> {
  return store$.let(getRecipeState)
    .map(recipeState => recipeState.ingredients)
    .distinctUntilChanged();
}

export function getRecipeLoading(store$: Store<AppState>): Observable<boolean> {
  return store$.let(getRecipeState)
    .map(recipeState => recipeState.loadingRecipes)
    .distinctUntilChanged();
}

export function getSelectedRecipe(store$: Store<AppState>): Observable<string> {
  return store$.let(getRecipeState)
    .map(recipeState => recipeState.selectedRecipe)
    .distinctUntilChanged();
}

export function getRecipeHits(store$: Store<AppState>): Observable<any> {
  return store$.let(getRecipeState)
    .map(recipeState => recipeState.recipes.hits)
    .distinctUntilChanged();
}

export function getRecipeLength(store$: Store<AppState>): Observable<number> {
  return store$.let(getRecipeState)
    .map(recipeState => recipeState.recipes.hits.length)
    .distinctUntilChanged();
}

export function getRecipes(store$: Store<AppState>): Observable<any> {
  return store$.let(getRecipeState)
    .map(recipeState => recipeState.recipes)
    .distinctUntilChanged();
}
