import { MdSnackBar, MdSnackBarModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { TestBed, getTestBed } from '@angular/core/testing';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import 'rxjs/Rx';

import { IngredientActions, LayoutActions } from './../actions';
import { IngredientService } from './../services';
import { IngredientEffects } from './ingredient-effects';
import { SEARCH_INGREDIENT, SEARCH_INGREDIENT_DETAILS } from '../actions';
import { ingredient } from '../reducers/ingredient';
import { layout } from '../reducers/layout';
import { recipe } from '../reducers/recipe';

const reducers = { ingredient, recipe, layout };

describe('ingredient-effects', () => {
  let ingredientService: IngredientService;
  let ingredientActions: IngredientActions;
  let runner: EffectsRunner;
  let ingredientEffects: IngredientEffects;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [
        EffectsTestingModule,
        HttpModule,
        StoreModule.provideStore(reducers),
        MdSnackBarModule
      ],
      providers: [
        IngredientEffects,
        IngredientService,
        IngredientActions,
        MdSnackBar,
        LayoutActions,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });

    ingredientService = injector.get(IngredientService);
    ingredientActions = injector.get(IngredientActions);
    runner = injector.get(EffectsRunner);
    ingredientEffects = injector.get(IngredientEffects);
  });

  describe('searchIngredient$', () => {
    const page = 1;
    const error = new Error('Connection error');

    beforeEach(() => {
      const response = {
        list: {
          total: 10,
          item: [{
            name: 'milk, liquid',
            title: 'milk',
            ndbno: 'asdfd665'
          }, {
            name: 'potatoes, mashed',
            title: 'potatoes',
            ndbno: 'fruifh48'
          }]
        }
      };

      const mockBackend: MockBackend = getTestBed().get(XHRBackend);
      mockBackend.connections.subscribe((c: MockConnection) => {
        if (c.request.url.indexOf('success') !== -1) {
          c.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(response)
          })));
        } else {
          c.mockError(error);
        }
      });
    });

    it('should trigger loading', () => {
      let loading = false;
      let count = 0;
      ingredientService.loading$.subscribe(isLoading => {
        loading = isLoading;
        // loading will be falsy initially and after the Observable finishes
        // loading will be truthy on the second run, while the Observable is running
        switch (count) {
          case 1:
            expect(loading).toBe(true);
            break;
          default:
            expect(loading).toBe(false);
            break;
        }
        count++;
      });

      ingredientEffects.searchIngredient$.subscribe(() => { return; });

      const action = {
        type: SEARCH_INGREDIENT,
        payload: {
          name: 'success',
          page
        }
      };

      runner.queue(action);
    });

    it('should return a SEARCH_SUCCESS action', () => {
      ingredientEffects.searchIngredient$.subscribe(res => {
        const refactoredRes = ingredientService.refactorRes(res, page);
        expect(res).toEqual(ingredientActions.searchSuccess(refactoredRes));
      });

      const action = {
        type: SEARCH_INGREDIENT,
        payload: {
          name: 'success',
          page
        }
      };

      runner.queue(action);
    });

    it('should return a SEARCH_FAILED action', () => {
      ingredientEffects.searchIngredient$.subscribe(res => {
        expect(res).toEqual(ingredientActions.searchFailed(error));
      });

      const action = {
        type: SEARCH_INGREDIENT,
        payload: {
          name: 'fail',
          page
        }
      };

      runner.queue(action);
    });
  });

  describe('searchIngredientDetails$', () => {
    const error = new Error('Connection error');
    let response: any;

    beforeEach(() => {
      response = {
        list: {
          total: 10,
          item: [{
            name: 'milk, liquid',
            title: 'milk',
            ndbno: 'asdfd665'
          }, {
            name: 'potatoes, mashed',
            title: 'potatoes',
            ndbno: 'fruifh48'
          }]
        }
      };

      const mockBackend: MockBackend = getTestBed().get(XHRBackend);
      mockBackend.connections.subscribe((c: MockConnection) => {
        if (c.request.url.indexOf('success') !== -1) {
          c.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(response)
          })));
        } else {
          c.mockError(error);
        }
      });
    });

    it('should trigger loading', () => {
      let loading = false;
      let count = 0;
      ingredientService.loadingDetails$.subscribe(isLoading => {
        loading = isLoading;
        // loading will be falsy initially and after the Observable finishes
        // loading will be truthy on the second run, while the Observable is running
        switch (count) {
          case 1:
            expect(loading).toBe(true);
            break;
          default:
            expect(loading).toBe(false);
            break;
        }
        count++;
      });

      ingredientEffects.searchIngredient$.subscribe(() => { return; });

      const action = {
        type: SEARCH_INGREDIENT_DETAILS,
        payload: 'success'
      };

      runner.queue(action);
    });

    it('should return a SEARCH_INGREDIENT_DETAILS_SUCCESS action', () => {
      ingredientEffects.searchIngredientDetails$.subscribe(res => {
        expect(res).toEqual(ingredientActions.searchDetailsSuccess(response));
      });

      const action = {
        type: SEARCH_INGREDIENT_DETAILS,
        payload: 'success'
      };

      runner.queue(action);
    });

    it('should return a SEARCH_INGREDIENT_DETAILS_FAILED action', () => {
      ingredientEffects.searchIngredientDetails$.subscribe(res => {
        expect(res).toEqual(ingredientActions.searchDetailsFailed(error));
      });

      const action = {
        type: SEARCH_INGREDIENT_DETAILS,
        payload: 'fail'
      };

      runner.queue(action);
    });
  });

});
