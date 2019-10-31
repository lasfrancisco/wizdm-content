import { Component, OnInit, Inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material';

const $timing = '200ms ease-out';

@Component({
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit { 

  constructor(private icon: MatIconRegistry) {}

  ngOnInit() {
    // Registers font awesome among the available sets of icons for mat-icon component
    this.icon.registerFontClassAlias('fontawesome', 'fa');
  }
}
