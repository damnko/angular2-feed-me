import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeService {
  constructor(private http: Http) { }

  public searchRecipes(query: string): Observable<any> {
    return this.http.get(`https://api.edamam.com/search?q=${query}&app_id=68ad704d&app_key=de477c78f5de444e37261e320e4a4d3a&from=0&to=3&calories=gte%20591,%20lte%20722&health=alcohol-free`)
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
