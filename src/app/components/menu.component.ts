import { Component } from '@angular/core';

@Component({
  selector: 'menu',
  styles: [`
    .active {
      font-weight: bold
    }
  `],
  template: `
  <ul>
    <li><a routerLink="/" routerLinkActive="active">FeedMe Logo</a></li>
    <li><a routerLink="/login" routerLinkActive="active">Login</a></li>
    <li>Subscribe</li>
    <li>Github</li>
  </ul>
  `
})

export class MenuComponent {

}
