import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Layout, AppState } from '../../../core/models';
import { LayoutActions } from '../../../core/actions/layout-actions';
import { LayoutService } from '../../../core/services/layout.service';

@Component({
  selector: 'toolbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [`./toolbar.component.scss`],
  template: `
  <md-toolbar color="primary" class="toolbar">
    <a href="#" (click)="toggleSide($event)" class="toggle-toolbar-icon">
      <i class="fa fa-bars" *ngIf="!(layout.sidebarOpened$ | async)"></i>
      <i class="fa fa-times" *ngIf="layout.sidebarOpened$ | async"></i>
    </a>
    <a routerLink="/" routerLinkActive="active">FeedMe</a>
    <span class="menu-space-filler"></span>
    <a href="https://github.com/damnko/angular2-feed-me">
      <i class="fa fa-2x fa-github" aria-hidden="true"></i>
    </a>
  </md-toolbar>
  `
})

export class ToolbarComponent {
  constructor(
    private store: Store<AppState>,
    private layoutActions: LayoutActions,
    public layout: LayoutService
  ) { }

  toggleSide(event: any) {
    event.preventDefault();
    this.store.dispatch(
      this.layoutActions.toggleSidebar()
    );
  }
}
