import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { config } from './../config';

@Injectable()
export class RecipeService {
  constructor(private http: Http) { }

  public searchRecipes(query: string): Observable<any> {
    return this.http.get(`https://api.edamam.com/search?q=${query}&app_id=${config.edamam.appId}&app_key=${config.edamam.apiKey}&from=0&to=3`)
      .map(res => res.json())
      .map(res => {
        return res.hits.map((item: any) => {
          return {
            name: item.recipe.label
          };
        });
      });
  }
}
