import { Layout } from '../../models/layout';
import { Observable } from 'rxjs/Observable';
import { LayoutActions } from '../../actions/layout-actions';
import { AppState } from '../../models/app-state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'toolbar',
  styleUrls: [`./toolbar.component.scss`],
  template: `
  <md-toolbar color="primary" class="toolbar">
    <a href="#" (click)="toggleSide($event)" class="toggle-toolbar-icon">
      <i class="fa fa-bars" *ngIf="!(layout$|async)?.sidebarOpened"></i>
      <i class="fa fa-times" *ngIf="(layout$|async)?.sidebarOpened"></i>
    </a>
    <a routerLink="/" routerLinkActive="active">FeedMe Logo</a>
    <span class="menu-space-filler"></span>
    <a routerLink="/" routerLinkActive="active">Github</a>
  </md-toolbar>

  `
})

export class ToolbarComponent implements OnInit {
  public layout$: Observable<Layout>;

  constructor(
    private store: Store<AppState>,
    private layoutActions: LayoutActions
  ) {}

  public ngOnInit() {
    this.layout$ = this.store.select('layout');
  }

  public toggleSide(event: any) {
    event.preventDefault();
    this.store.dispatch(
      this.layoutActions.toggleSidebar()
    );
  }
}
