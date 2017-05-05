import { Action, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { MdSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { AppState, Layout } from '../models';
import {
  IngredientActions,
  LayoutActions,
  SEARCH_INGREDIENT, SEARCH_INGREDIENT_DETAILS,
  ADD_INGREDIENT, REMOVE_INGREDIENT
} from './../actions';
import { IngredientService } from './../services/ingredient.service';

@Injectable()
export class IngredientEffects {
  constructor(
    private store: Store<AppState>,
    private actions: Actions,
    private ingredientService: IngredientService,
    private ingredientActions: IngredientActions,
    private snackBar: MdSnackBar,
    private layoutActions: LayoutActions
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

  @Effect({ dispatch: false })
  public showAddSnackbar$ = this.actions.ofType(ADD_INGREDIENT)
    .withLatestFrom(this.store.select('layout'))
    .map(([action, layout]) => layout)
    .do((layoutState: Layout) => {
      if (layoutState.sidebarOpened) {
        this.snackBar.open('Item added to ingredients list', null, { duration: 1500 });
      } else {
        const ref = this.snackBar.open('Item added to ingredients list', 'SHOW LIST', { duration: 3000 });
        ref.onAction().subscribe(() => {
          this.store.dispatch(this.layoutActions.openSidebar(true));
        });
      }
    }).switchMap(() => Observable.of(undefined));

  @Effect({ dispatch: false })
  public showDeleteSnackbar$ = this.actions.ofType(REMOVE_INGREDIENT)
    .do(() => this.snackBar.open('Item removed from ingredients list', null, {
      duration: 1500,
      extraClasses: ['snackbar-delete']
    }));
}
