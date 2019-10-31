import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatDividerModule,
  MatProgressBarModule,
} from '@angular/material';
import { NavigatorComponent } from './navigator.component';
import { NavigatorRoutingModule } from './navigator-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule, 
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressBarModule,
    NavigatorRoutingModule
  ],
  declarations: [ 
    NavigatorComponent
  ]
})
export class NavigatorModule { }