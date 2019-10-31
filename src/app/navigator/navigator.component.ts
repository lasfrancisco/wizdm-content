import { Component } from '@angular/core';
import { Router, NavigationEnd, ResolveStart } from '@angular/router';
import { trigger, state, animate, style, transition } from '@angular/animations';
import { filter, map, startWith, tap } from 'rxjs/operators';

interface Language {
  value: string;
  label: string;
}

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent {

  public loading = true;

  constructor(private router: Router) {

    this.router.events.pipe( 
      // Filters Resolve events only
      filter( e => e instanceof ResolveStart || e instanceof NavigationEnd ), 
      // Maps the event into true/false
      map( e => e instanceof ResolveStart )
      // Shows the loader spinner while resolving the route content
    ).subscribe( e => this.loading = e );
  }

  // Builds a link to the specified language current route 
  public languageLink(lang: string): any[] {
    const cmds = this.router.url.split('/');
    cmds[0] = '/';
    cmds[1] = lang;
    return cmds;
  }

  public language(lang: string, languages: Language[]): string {
    return ( languages.find( language => language.value === lang ) || {} as Language).label || '';
  }  
}