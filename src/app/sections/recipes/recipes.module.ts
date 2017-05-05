import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShowRecipesComponent, RecipeResultTextComponent } from './index';
import { SharedModule } from '../../shared/shared.module';
import { RecipesRoutingModule } from './recipes.routing';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RecipesRoutingModule,
    SharedModule
  ],
  declarations: [
    ShowRecipesComponent,
    RecipeResultTextComponent
  ],
})
export class RecipesModule { }
