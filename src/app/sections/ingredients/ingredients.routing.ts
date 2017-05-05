import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IngredientSearchComponent } from './ingredient-search.component';

const routes: Routes = [
  { path: '', component: IngredientSearchComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngredientsRoutingModule { }
