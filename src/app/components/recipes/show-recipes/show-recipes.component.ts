import { RecipeActions } from '../../../actions/recipe-actions';
import { Recipe } from '../../../models/recipe';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../../models/app-state';
import { Store } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'show-recipes',
  styleUrls: ['./show-recipes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./show-recipes.component.html`
})

export class ShowRecipesComponent implements OnInit {
  public recipes$: Observable<Recipe>;
  public query: string = '';

  public uno: any;
  public due: any;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private recipeActions: RecipeActions,
    private router: Router
  ) { }

  public ngOnInit() {
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
        console.log('selected recipe is', selectedRecipe, this.query);
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

  public isSelected(name: string, recipe: any): boolean {
    return name === recipe.name;
  }

  public selectRecipe(name: string): void {
    this.store.dispatch(
      this.recipeActions.selectRecipe(name)
    );
  }

  public searchRecipe(searchText: string): void {
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
