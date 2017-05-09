import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
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
    FlexLayoutModule
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
    RouterModule,
    NgxPaginationModule
  ]
})
export class SharedModule { }
