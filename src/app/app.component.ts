import { Component } from '@angular/core';
import { config } from './config';

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
export class AppComponent {
  constructor() {
    console.log('config is', config);
  }
}
