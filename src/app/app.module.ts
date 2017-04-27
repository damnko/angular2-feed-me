import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

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
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    FactsheetComponent,
    MenuComponent,
    SearchInputComponent,
    IngredientSearchComponent,
    SidebarComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
