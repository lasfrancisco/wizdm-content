import { NgModule, Injectable, Inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ContentSelector, ContentConfigurator, ContentRouterModule, RoutesWithContent, AllowedContent } from '../content';
import { NavigatorComponent } from './navigator.component';
import { of } from 'rxjs';
import { first, delay, map } from 'rxjs/operators';

@Injectable() 
class MyAsyncSeletor extends ContentSelector {

  private current = this.config.defaultValue;

  constructor(router: Router, config: ContentConfigurator){ super(router, config); }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): AllowedContent {

    console.log("Simulating asyncronous user authentication check");

    return of(null).pipe( 

      first(),
      
      delay(100),

      map(user => {
        // Gets the language code requested from the route 
        const requested = route.paramMap.get( this.config.selector );
        console.log('Requested language:', requested);

        const preferred = user && user.lang;
        console.log('User preferred language:', preferred);

        // Selects the best language among the allowed ones 
        const selected = this.languageAllowed( 
          
          requested === 'auto' ? 
        
          // Detects the langage automatically on request  
          ( preferred || this.browserLanguage ) : 
          
          // Replaces wildcards with the current language
          ( requested === '**' ? this.current : requested )
        
        );

        console.log('Selected language:', selected);

        // Keeps track of  the currently selected language
        this.current = selected;

        // Redirects to the selected whenever differs from the requested
        return(requested !== selected ? this.switchLanguage(selected, state) : true) as AllowedContent;
      }) 
    );
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