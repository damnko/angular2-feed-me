import { Observable } from 'rxjs/Observable';
import { AppState } from './../models/app-state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'recipes',
  template: `
  <ul>
    <li *ngFor="let recipe of (recipes$|async)">{{ recipe.name }}</li>
  </ul>
  `
})

export class RecipesComponent implements OnInit {
  public recipes$: Observable<any[]>;

  constructor(private store: Store<AppState>) { }

  public ngOnInit() {
    this.recipes$ = this.store.select('recipe')
      .map((state: any) => state.recipes);
  }
}
