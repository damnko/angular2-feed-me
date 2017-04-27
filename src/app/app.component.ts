import { Component } from '@angular/core';

@Component({
  selector: 'app',
  styleUrls: [
    `./app.component.scss`
  ],
  template: `
    <h1>App main component</h1>
    <sidebar></sidebar>
    <menu></menu>
    <router-outlet></router-outlet>
  `
})
export class AppComponent { }
