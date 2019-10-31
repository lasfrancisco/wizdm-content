import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotFoundComponent } from './not-found.component';
import { ContentRouterModule, RoutesWithContent } from '../../content';

const routes: RoutesWithContent = [
  {
    path: '',
    component: NotFoundComponent,
    content: 'not-found'
  }
];

@NgModule({
  declarations: [ NotFoundComponent ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ContentRouterModule.forChild(routes)
  ]
})
export class NotFoundModule { }