import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

import { RecipeActions } from '../../../core/actions';
import { AppState, Recipe } from '../../../core/models';

@Component({
  selector: 'show-recipes',
  styleUrls: ['./show-recipes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./show-recipes.component.html`
})

export class ShowRecipesComponent implements OnInit {
  recipes$: Observable<Recipe>;
  query: string = '';

  uno: any;
  due: any;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private recipeActions: RecipeActions,
    private router: Router
  ) { }

  ngOnInit() {
    this.recipes$ = this.store.select('recipe');

    this.uno = this.route.queryParams
      .map(params => {
        this.query = params['q'];
        return { q: params['q'], s: params['s'] };
      }).withLatestFrom(this.store.select('recipe'))
      .subscribe(([query, recipe]: [any, Recipe]) => {
        // trigger search if arriving here from direct link
        if (query.q !== recipe.recipes.query) {
          this.store.dispatch(
            this.recipeActions.searchRecipe(query.q)
          );
        }
        // trigger selected recipe if arriving here from direct link
        if (query.s !== recipe.selectedRecipe) {
          this.selectRecipe(query.s);
        }
      });

    this.due = this.recipes$.map(recipes => recipes.selectedRecipe)
      .subscribe(selectedRecipe => {
        if (selectedRecipe !== undefined) {
          const q = this.query;
          const s = selectedRecipe;
          const navExtras: NavigationExtras = {
            queryParams: (!selectedRecipe) ? { q } : { q, s },
            relativeTo: this.route,
            // skipLocationChange: true,
            // queryParamsHandling: 'merge',
          };
          this.router.navigate(['.'], navExtras);
        }
      });
  }

  isSelected(name: string, recipe: any): boolean {
    return name === recipe.name;
  }

  selectRecipe(name: string): void {
    this.store.dispatch(
      this.recipeActions.selectRecipe(name)
    );
  }

  searchRecipe(searchText: string): void {
    this.query = searchText;
    this.store.dispatch(
      this.recipeActions.searchRecipe(searchText)
    );
  }

  ngOnDestroy() {
    this.uno.unsubscribe();
    this.due.unsubscribe();
  }
}
