import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { SidebarComponent, ToolbarComponent } from './index';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ToolbarComponent,
    SidebarComponent
  ],
  exports: [
    ToolbarComponent,
    SidebarComponent
  ]
})
export class CommonLayoutModule { }
