import { RecipesComponent } from './components/recipes.component';
import { RecipeService } from './services/recipe.service';
import { RecipeEffects } from './effects/recipe-effects';
import { RecipeActions } from './actions/recipe-actions';
import { IngredientEffects } from './effects/ingredient-effects';
import { IngredientService } from './services/ingredient.service';
import { IngredientActions } from './actions/ingredient-action';
import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ingredient } from './reducers/ingredient';
import { recipe } from './reducers/recipe';
import { initialIngredient, initialRecipe } from './models/app-state';

import {
  MenuComponent,
  SidebarComponent,
  LoginComponent
} from './components';
import {
  IngredientSearchComponent,
  FactsheetComponent,
  SearchInputComponent
} from './components/ingredient-search';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

// global styles
import '../styles/styles.scss';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    EffectsModule.run(IngredientEffects),
    EffectsModule.run(RecipeEffects),
    StoreModule.provideStore({ ingredient, recipe }, { ingredient: initialIngredient, recipe: initialRecipe })
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    FactsheetComponent,
    MenuComponent,
    SearchInputComponent,
    IngredientSearchComponent,
    SidebarComponent,
    RecipesComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    IngredientActions,
    IngredientService,
    RecipeActions,
    RecipeService
  ]
})
export class AppModule { }
