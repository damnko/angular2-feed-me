import { RouterModule, Router } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { TestBed, getTestBed, async } from '@angular/core/testing';
import { EffectsTestingModule, EffectsRunner } from '@ngrx/effects/testing';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import 'rxjs/Rx';

import { RecipeActions } from './../actions';
import { RecipeService } from './../services';
import { RecipeEffects } from './recipe-effects';
import { SEARCH_RECIPE, SEARCH_RECIPE_SUCCESS } from '../actions';
import { ingredient } from '../reducers/ingredient';
import { layout } from '../reducers/layout';
import { recipe } from '../reducers/recipe';

const reducers = { ingredient, recipe, layout };

describe('recipe-effects', () => {
  let recipeService: RecipeService;
  let recipeActions: RecipeActions;
  let runner: EffectsRunner;
  let recipeEffects: RecipeEffects;
  let router: Router;
  let routerStub: { navigate: any };

  beforeEach(async(() => {
    routerStub = {
      navigate: jasmine.createSpy('navigate')
    };
    const injector = TestBed.configureTestingModule({
      imports: [
        EffectsTestingModule,
        HttpModule,
        StoreModule.provideStore(reducers)
      ],
      providers: [
        RecipeService,
        RecipeActions,
        RecipeEffects,
        { provide: XHRBackend, useClass: MockBackend },
        { provide: Router, useValue: routerStub }
      ]
    });

    recipeService = injector.get(RecipeService);
    recipeActions = injector.get(RecipeActions);
    runner = injector.get(EffectsRunner);
    recipeEffects = injector.get(RecipeEffects);
    router = injector.get(Router);
  }));

  describe('searchRecipes$', () => {
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
      recipeService.loading$.subscribe(isLoading => {
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

      recipeEffects.searchRecipes$.subscribe(() => { return; });

      const action = {
        type: SEARCH_RECIPE,
        payload: {
          query: 'success',
          page
        }
      };

      runner.queue(action);
    });

    it('should return a SEARCH_RECIPE_SUCCESS action', () => {
      recipeEffects.searchRecipes$.subscribe(res => {
        const refactoredRes = recipeService.refactorRes(res, page);
        expect(res).toEqual(recipeActions.searchRecipeSuccess(refactoredRes));
      });

      const action = {
        type: SEARCH_RECIPE,
        payload: {
          query: 'success',
          page
        }
      };

      runner.queue(action);
    });

    it('should return a SEARCH_RECIPE_FAILED action', () => {
      recipeEffects.searchRecipes$.subscribe(res => {
        expect(res).toEqual(recipeActions.searchRecipeFailed(error));
      });

      const action = {
        type: SEARCH_RECIPE_SUCCESS,
        payload: {
          query: 'fail',
          page
        }
      };

      runner.queue(action);
    });
  });

  describe('showRecipes$', () => {
    it('router should navigate to /recipes with navigationExtras', () => {

      recipeEffects.showRecipes$.subscribe(() => { return; });

      const action = {
        type: SEARCH_RECIPE_SUCCESS,
        payload: {
          query: 'milk'
        }
      };

      const result = [
        ['/recipes'],
        {
          queryParams: {
            q: action.payload.query
          }
        }
      ];

      runner.queue(action);
      expect(routerStub.navigate).toHaveBeenCalledWith(...result);
    });
  });

});
