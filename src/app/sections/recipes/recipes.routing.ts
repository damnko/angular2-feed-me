import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowRecipesComponent } from './index';

const routes: Routes = [
  { path: '', component: ShowRecipesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule { }
