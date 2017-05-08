import { Ingredient } from './../models/ingredient';
import { AppState } from './../models/app-state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { config } from '../../config';
import {
  getIngredientsState,
  getIngredientsSearchTerm,
  getIngredientsLoading,
  getSelectedIngredient,
  getSelectedIngredientName,
  getSelectedIngredientNutrients,
  getIngredientError,
  getIngredientDetails,
} from '../selectors/ingredients-selectors';

@Injectable()
export class IngredientService {
  ingredient$: Observable<Ingredient>;
  searchTerm$: Observable<string>;
  loading$: Observable<boolean>;
  selectedIngredient$: Observable<any>;
  error$: Observable<any>;
  details$: Observable<any>;
  selectedIngredientName$: Observable<string>;
  selectedIngredientNutrients$: Observable<any>;

  constructor(
    private http: Http,
    private store: Store<AppState>
  ) {
    this.ingredient$ = getIngredientsState(store);
    this.searchTerm$ = getIngredientsSearchTerm(store);
    this.loading$ = getIngredientsLoading(store);
    this.selectedIngredient$ = getSelectedIngredient(store);
    this.error$ = getIngredientError(store);
    this.details$ = getIngredientDetails(store);
    this.selectedIngredientName$ = getSelectedIngredientName(store);
    this.selectedIngredientNutrients$ = getSelectedIngredientNutrients(store);
  }

  keyupSearch(query$: Observable<string>): Observable<string> {
    return query$.map((res: any) => res.target.value)
      .distinctUntilChanged()
      .debounceTime(400)
      .filter((searchStr: string) => searchStr !== '' && searchStr.length > 2);
  }

  searchIngredient(searchString: string): Observable<any> {
    const baseUrl = 'https://api.nal.usda.gov/ndb/search/';
    const urlParams = [
      `format=json`,
      `q=${searchString}`,
      `sort=r`,
      `max=25`,
      `offset=0`,
      `api_key=${config.usda.apiKey}`
    ].join('&');

    return this.http.get(`${baseUrl}?${urlParams}`)
      .map((res) => res.json())
      .map(res => res.list)
      .map(res => {
        return {
          start: res.start,
          end: res.end,
          total: res.total,
          item: res ? res.item.map(this.refactorIngredient) : []
        };
      });
  }

  searchIngredientDetails(ndbno: string): Observable<any> {
    const baseUrl = 'https://api.nal.usda.gov/ndb/reports/';
    const urlParams = [
      `ndbno=${ndbno}`,
      `api_key=${config.usda.apiKey}`
    ].join('&');

    return this.http.get(`${baseUrl}?${urlParams}`)
      .map(res => res.json());
  }

  private refactorIngredient(ingredient: any): any {
    const name = ingredient.name.toLowerCase().split(',');
    let title = name.shift();
    title = title[0].toUpperCase() + title.slice(1);
    let body = name.join(',');
    body = body[0].toUpperCase() + body.slice(1);
    return {
      title,
      name: body,
      ndbno: ingredient.ndbno,
      loadingDetails: false
    };
  }
}
