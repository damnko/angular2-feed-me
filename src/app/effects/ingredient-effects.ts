import { AppState } from './../models/app-state';
import { Observable } from 'rxjs/Observable';
import { IngredientActions } from './../actions/ingredient-action';
import { IngredientService } from './../services/ingredient.service';
import { Action, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { SEARCH_INGREDIENT, SEARCH_INGREDIENT_DETAILS } from '../actions/ingredient-action';

@Injectable()
export class IngredientEffects {
  constructor(
    private store: Store<AppState>,
    private actions: Actions,
    private ingredientService: IngredientService,
    private ingredientActions: IngredientActions
  ) {}

  @Effect()
  public searchIngredient$: Observable<Action> = this.actions.ofType(SEARCH_INGREDIENT)
    .do(() => this.store.dispatch(this.ingredientActions.setLoading(true)))
    .map((action: Action) => action.payload)
    .switchMap((searchTerm: string) => {
      return this.ingredientService.searchIngredient(searchTerm)
        .map(res => this.ingredientActions.searchSuccess(res))
        .catch(err => Observable.of(this.ingredientActions.searchFailed(err)))
        .finally(() => this.store.dispatch(this.ingredientActions.setLoading(false)));
    });

  @Effect()
  public searchIngredientDetails$: Observable<Action> = this.actions.ofType(SEARCH_INGREDIENT_DETAILS)
    .do(() => this.store.dispatch(this.ingredientActions.setLoadingDetails(true)))
    .map((action: Action) => action.payload)
    .switchMap((ndbno: string) => {
      return this.ingredientService.searchIngredientDetails(ndbno)
        .map(res => this.ingredientActions.searchDetailsSuccess(res))
        .catch(error => Observable.of(this.ingredientActions.searchDetailsFailed(error)))
        .finally(() => this.store.dispatch(this.ingredientActions.setLoadingDetails(false)));
    });
}
