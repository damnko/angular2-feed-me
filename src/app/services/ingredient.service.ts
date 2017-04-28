import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class IngredientService {
  constructor(private http: Http) { }

  public searchIngredient(searchString: string): Observable<any> {
    return this.http.get(`https://api.nal.usda.gov/ndb/search/?format=json&q=${searchString}&sort=r&max=25&offset=0&api_key=FQX8nVTZlGIKRyxzBTJJTaKeMBkpIPZNgxTdN1Px`)
      .map((res) => res.json());
  }

  public searchIngredientDetails(ndbno: string): Observable<any> {
    return this.http.get(`https://api.nal.usda.gov/ndb/reports/?ndbno=${ndbno}&api_key=FQX8nVTZlGIKRyxzBTJJTaKeMBkpIPZNgxTdN1Px`)
      .map(res => res.json());
  }
}
