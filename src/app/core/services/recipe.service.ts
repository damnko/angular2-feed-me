import { AppState } from './../models/app-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { config } from '../../config';
import { Ingredients, Recipe } from '../models';
import {
  getRecipeIngredients,
  getRecipeLoading,
  getRecipeState,
  getSelectedIngredient,
} from '../selectors';

@Injectable()
export class RecipeService {
  recipe$: Observable<Recipe>;
  ingredients$: Observable<Ingredients>;
  loading$: Observable<boolean>;
  selectedIngredient$: Observable<string>;

  constructor(
    private http: Http,
    private store: Store<AppState>
  ) {
    this.recipe$ = getRecipeState(store);
    this.ingredients$ = getRecipeIngredients(store);
    this.loading$ = getRecipeLoading(store);
    this.selectedIngredient$ = getSelectedIngredient(store);
  }

  getAllIngredients$(): Observable<string[]> {
    return this.ingredients$
      .map(ingredients => Array.from(ingredients.values()))
      .map(ingredients => ingredients.map(ingredient => ingredient.name.split(',')[0]));
  }

  searchRecipes$(query: string): Observable<any> {
    const baseUrl = 'https://api.edamam.com/search';
    const urlParams = [
      `q=${query}`,
      `app_id=${config.edamam.appId}`,
      `app_key=${config.edamam.apiKey}`,
      `from=0`,
      `to=10`
    ].join('&');
    return this.http.get(`${baseUrl}?${urlParams}`)
      .map(res => res.json())
      .map(res => {
        return {
          query: res.q,
          count: res.count,
          from: res.from,
          to: res.to,
          hits: res.hits.map((item: any) => {
            return {
              name: item.recipe.label,
              img: item.recipe.image,
              url: item.recipe.url,
              labels: item.recipe.healthLabels,
              calories: item.recipe.calories,
              ingredients: item.recipe.ingredientLines
            };
          })
        };
      });
  }

  isIngredientSaved$(ndbno: string): Observable<boolean> {
    return this.ingredients$
      .map(i => i.has(ndbno))
      .distinctUntilChanged();
  }
}
