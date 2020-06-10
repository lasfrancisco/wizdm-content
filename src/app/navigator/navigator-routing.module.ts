import { NgModule, Injectable, Inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { ContentSelector, ContentConfigurator, ContentRouterModule, RoutesWithContent, AllowedContent } from '../content';
import { NavigatorComponent } from './navigator.component';

@Injectable({ providedIn: 'root' })
class test implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    console.log(route, state);
    
    return true;
  }
}

const routes: RoutesWithContent = [
  { path: '', redirectTo: 'auto', pathMatch: 'full' },
  { 
    path: ':lang', component: NavigatorComponent, 
    canActivate: [ test, ContentSelector ],
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
  providers: [ ContentSelector ]
})
export class NavigatorRoutingModule { }