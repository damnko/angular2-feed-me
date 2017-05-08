import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Ingredient } from '../models/ingredient';
import { AppState } from '../models/app-state';

export function getIngredientsState(store$: Store<AppState>): Observable<Ingredient> {
  return store$.select((appState: AppState) => appState.ingredient)
    .distinctUntilChanged();
}

export function getIngredientsSearchTerm(store$: Store<AppState>): Observable<string> {
  return store$.let(getIngredientsState)
    .map((ingredient: Ingredient) => ingredient.searchTerm)
    .distinctUntilChanged();
}

export function getIngredientsLoading(store$: Store<AppState>): Observable<boolean> {
  return store$.let(getIngredientsState)
    .map((ingredient: Ingredient) => ingredient.loading)
    .distinctUntilChanged();
}

export function getSelectedIngredient(store$: Store<AppState>): Observable<any> {
  return store$.let(getIngredientsState)
    .map((ingredient: Ingredient) => ingredient.selectedIngredient)
    .filter(res => res !== null)
    .distinctUntilChanged();
}

export function getSelectedIngredientName(store$: Store<AppState>): Observable<string> {
  return store$.let(getSelectedIngredient)
    .map(ing => ing.report.food.name)
    .distinctUntilChanged();
}

export function getSelectedIngredientNutrients(store$: Store<AppState>): Observable<any> {
  return store$.let(getSelectedIngredient)
    .map(ing => ing.report.food.nutrients)
    .map(nutrients => nutrients.map((nutrient: any) => {
      return {
        name: nutrient.name,
        value: nutrient.value + nutrient.unit
      };
    }))
    .distinctUntilChanged();
}

export function getIngredientError(store$: Store<AppState>): Observable<any> {
  return store$.let(getIngredientsState)
    .map((ingredient: Ingredient) => ingredient.error)
    .distinctUntilChanged();
}

export function getIngredientDetails(store$: Store<AppState>): Observable<any> {
  return store$.let(getIngredientsState)
    .map((ingredient: Ingredient) => ingredient.details)
    .distinctUntilChanged();
}
