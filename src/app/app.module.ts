import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContentModule, ContentLoader, DefaultLoader } from './content';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./navigator/navigator.module').then(m => m.NavigatorModule) },
];

@NgModule({
  imports: [   
    BrowserModule, 
    BrowserAnimationsModule, 
    ContentModule.init({ selector: 'lang', supportedValues: ['en', 'it', 'ru'] }),
    RouterModule.forRoot(routes)
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ],
  //providers: [ { provide: ContentLoader, useExisting: DefaultLoader }  ]
})
export class AppModule { }
