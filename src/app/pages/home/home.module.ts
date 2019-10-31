import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { ContentRouterModule, RoutesWithContent } from '../../content';
import { HomeComponent } from './home.component';

const routes: RoutesWithContent = [
  {
    path: '',
    component: HomeComponent,
    content: 'home'
  }
];

@NgModule({
  declarations: [ HomeComponent ],
  imports: [
    CommonModule,
    FlexLayoutModule, 
    MatButtonModule,
    MatIconModule,
    ContentRouterModule.forChild(routes)
  ]
})
export class HomeModule { }