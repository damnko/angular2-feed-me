import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {
  MdButtonModule,
  MdToolbarModule,
  MdInputModule,
  MdCardModule,
  MdChipsModule,
  MdDialogModule,
  MdProgressBarModule,
  MdSnackBarModule,
  MdListModule,
  MdProgressSpinnerModule
} from '@angular/material';

import { LoadingComponent } from './components';

const ANGULAR_MATERIAL_COMPONENTS = [
  MdButtonModule,
  MdToolbarModule,
  MdInputModule,
  MdCardModule,
  MdChipsModule,
  MdDialogModule,
  MdProgressBarModule,
  MdSnackBarModule,
  MdListModule,
  MdProgressSpinnerModule,
];

@NgModule({
  imports: [
    ...ANGULAR_MATERIAL_COMPONENTS,
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    NgxDatatableModule
  ],
  declarations: [
    LoadingComponent
  ],
  exports: [
    ...ANGULAR_MATERIAL_COMPONENTS,
    FlexLayoutModule,
    NgxDatatableModule,
    LoadingComponent,
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
