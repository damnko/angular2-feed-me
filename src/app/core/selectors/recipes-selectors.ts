import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Recipe, AppState, RecipeIngredient, Ingredients } from '../models';

export function getRecipeState(store$: Store<AppState>): Observable<Recipe> {
  return store$.select((state: AppState) => state.recipe)
    .distinctUntilChanged();
}

export function getRecipeIngredients(store$: Store<AppState>): Observable<Ingredients> {
  return store$.let(getRecipeState)
    .map((recipeState: Recipe) => recipeState.ingredients)
    .distinctUntilChanged();
}

export function getRecipeLoading(store$: Store<AppState>): Observable<boolean> {
  return store$.let(getRecipeState)
    .map((recipeState: Recipe) => recipeState.loadingRecipes)
    .distinctUntilChanged();
}
