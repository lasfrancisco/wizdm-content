import { Component } from '@angular/core';

@Component({
  selector: 'wm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: { 'class': 'wm-theme-colors' }
})
export class HomeComponent {

  constructor() { }
}