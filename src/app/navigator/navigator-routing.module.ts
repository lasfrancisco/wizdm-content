import { NgModule, Injectable, Inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { ContentSelector, ContentConfigurator, ContentRouterModule, RoutesWithContent, AllowedContent } from '../content';
import { NavigatorComponent } from './navigator.component';

@Injectable({ providedIn: 'root' })
class WelcomeNewComers implements CanActivate {

  private newComer: boolean = true;

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if(this.newComer && state.url.split('/')[1] === 'auto') { 

      this.newComer = false;

      return this.router.createUrlTree([ 'auto', 'about' ]);
    }  
    
    return true;
  }
}

const routes: RoutesWithContent = [
  { path: '', redirectTo: 'auto', pathMatch: 'full' },
  { 
    path: ':lang', component: NavigatorComponent, 
    canActivate: [ WelcomeNewComers, ContentSelector ],
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