import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { config } from '../../config';

@Injectable()
export class IngredientService {
  constructor(private http: Http) { }

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
