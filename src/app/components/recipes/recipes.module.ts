import { RecipesRoutingModule } from './recipes.routing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowRecipesComponent, RecipeResultTextComponent } from './index';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RecipesRoutingModule
  ],
  declarations: [
    ShowRecipesComponent,
    RecipeResultTextComponent
  ],
})
export class RecipesModule { }
