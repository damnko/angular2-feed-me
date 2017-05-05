import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { config } from '../../config';

@Injectable()
export class RecipeService {
  constructor(private http: Http) { }

  public searchRecipes(query: string): Observable<any> {
    return this.http.get(`https://api.edamam.com/search?q=${query}&app_id=${config.edamam.appId}&app_key=${config.edamam.apiKey}&from=0&to=10`)
      .map(res => res.json())
      .do(res => console.log(res))
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
      }).do(console.log);
  }
}
