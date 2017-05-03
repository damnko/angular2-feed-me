import { Layout } from './../models/layout';
import { Observable } from 'rxjs/Observable';
import { LayoutActions } from './../actions/layout-actions';
import { AppState } from './../models/app-state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'toolbar',
  styles: [`
    .active {
      font-weight: bold
    }
    .menu-space-filler {
      flex: 1 1 auto;
    }
  `],
  template: `
  <md-toolbar color="primary">
    <i class="fa fa-bars" (click)="toggleSide()" *ngIf="!(layout$|async)?.sidebarOpened"></i>
    <i class="fa fa-times" (click)="toggleSide()" *ngIf="(layout$|async)?.sidebarOpened"></i>
    <a routerLink="/" routerLinkActive="active">FeedMe Logo</a>
    <span class="menu-space-filler"></span>
    <a routerLink="/login" routerLinkActive="active">Login</a>
    <a routerLink="/" routerLinkActive="active">Subscribe</a>
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

  public toggleSide() {
    this.store.dispatch(
      this.layoutActions.toggleSidebar()
    );
  }
}
