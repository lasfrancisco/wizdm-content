import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'wm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: { 'class': 'wm-theme-colors' }
})
export class HomeComponent {

  constructor(private router: Router) { }

  navigationTest(url: string) {

    return this.router.navigateByUrl(url.startsWith('/') ? url : `/**/${url}`);
  }
}