import { LayoutActions } from './actions/layout-actions';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdToolbarModule, MdGridListModule, MdInputModule, MdGridListModule, MdCardModule, MdChipsModule, MdDialogModule, MdProgressBarModule } from '@angular/material';
import { SidebarModule } from 'ng-sidebar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import 'hammerjs';

import { ingredient } from './reducers/ingredient';
import { recipe } from './reducers/recipe';
import { layout } from './reducers/layout';
import { initialIngredient, initialRecipe, initialLayout } from './models/app-state';

import {
  ToolbarComponent,
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
    StoreModule.provideStore({ ingredient, recipe, layout }, { ingredient: initialIngredient, recipe: initialRecipe, layout: initialLayout }),
    BrowserAnimationsModule,
    MdButtonModule,
    MdToolbarModule,
    MdGridListModule,
    MdInputModule,
    MdGridListModule,
    MdCardModule,
    MdChipsModule,
    MdDialogModule,
    MdProgressBarModule,
    SidebarModule.forRoot(),
    FlexLayoutModule,
    NgxDatatableModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    FactsheetComponent,
    ToolbarComponent,
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
    RecipeService,
    LayoutActions
  ],
  entryComponents: [
    FactsheetComponent
  ]
})
export class AppModule { }
