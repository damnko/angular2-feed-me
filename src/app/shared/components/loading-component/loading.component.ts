import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading-message',
  styleUrls: ['./loading.component.scss'],
  template: `
  <span class="loading-ingredients">
    <md-spinner></md-spinner>
    Searching for <strong>{{ searchString }}</strong>...
  </span>
  `
})

export class LoadingComponent {
  @Input() public searchString: string;
}
