import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContentRouterModule, RoutesWithContent, ContentConfigurator, ContentLoader, DefaultLoader } from '../../content';
import { AboutComponent } from './about.component';
import { map } from 'rxjs/operators';

@Injectable()
class MyCustomLoader extends DefaultLoader {

  constructor(config: ContentConfigurator, http: HttpClient) { 
    super(config, http); 
  }

  public loadModule(lang: string, moduleName: string) {

    return super.loadModule(lang, moduleName)
      .pipe( map( data => {

        console.log(data);

        data.lang = this.language;

        return data;
      }) );
  }
}

const routes: RoutesWithContent = [
  {
    path: '',
    component: AboutComponent,
    content: 'about'
  }
];

@NgModule({
  declarations: [ AboutComponent ],
  imports: [
    CommonModule,
    HttpClientModule,
    FlexLayoutModule,
    ContentRouterModule.forChild(routes)
  ],
  providers: [ 
    MyCustomLoader,
    { provide: ContentLoader, useExisting: MyCustomLoader } ]
})
export class AboutModule { }