import { NgModule, Injectable, Inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ContentSelector, ContentConfigurator, ContentRouterModule, RoutesWithContent, AllowedContent } from '../content';
import { NavigatorComponent } from './navigator.component';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable() 
class MyAsyncSeletor extends ContentSelector {

  constructor(router: Router, config: ContentConfigurator){ super(router, config); }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): AllowedContent {

    console.log('Simulating asyncronous language selection');

    return of( super.canActivate(route, state) ).pipe( delay(100) ) as AllowedContent;
  }
}

const routes: RoutesWithContent = [
  { path: '', redirectTo: 'auto', pathMatch: 'full' },
  { 
    path: ':lang', component: NavigatorComponent, 
    canActivate: [ MyAsyncSeletor ],
    content: 'navigator',
    
    children: [

      { path: 'not-found', loadChildren: () => import('../pages/not-found/not-found.module').then(m => m.NotFoundModule) },
    
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('../pages/home/home.module').then(m => m.HomeModule) },
      
      { path: 'about', loadChildren: () => import('../pages/about/about.module').then(m => m.AboutModule) },
      
      { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ ContentRouterModule.forChild(routes) ],
  exports: [ ContentRouterModule ],
  providers: [ MyAsyncSeletor ]
})
export class NavigatorRoutingModule { }