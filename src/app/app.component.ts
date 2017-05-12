import { Store } from '@ngrx/store';
import { Component, ViewEncapsulation, OnInit, AfterViewInit, Renderer2 } from '@angular/core';

import { Layout, AppState } from './core/models';
import { LayoutActions } from './core/actions';
import { config } from './config';

@Component({
  selector: 'app',
  styleUrls: [`./app.component.scss`],
  template: `
    <ng-sidebar-container>
      <ng-sidebar
        [(opened)]="sidebarOpened"
        mode="push">
        <sidebar></sidebar>
      </ng-sidebar>
      <section>
        <toolbar></toolbar>
        <router-outlet></router-outlet>
      </section>
    </ng-sidebar-container>
  `
})
export class AppComponent implements OnInit, AfterViewInit {
  sidebarOpened: boolean = false;

  constructor(
    private store: Store<AppState>,
    private layoutActions: LayoutActions,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.store.select('layout')
      .map((layout: Layout) => layout.sidebarOpened)
      .subscribe(sidebarOpened => {
        this.openSidebar(sidebarOpened);
      });

    setTimeout(() => {
      this.store.dispatch(
        this.layoutActions.openSidebar(true)
      );
    }, 1000);
  }

  openSidebar(open: boolean): void {
      this.sidebarOpened = open;
  }

  ngAfterViewInit() {
    // hide preloader
    const preloader: HTMLElement = document.getElementById('preloader');
    this.renderer.addClass(preloader, 'loaded');
  }
}
