import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        component: HomePage
      },
      {
        path: 'about',
        loadComponent: () => import('./features/public/about/about.component')
          .then(m => m.AboutPage)
      },
      {
        path: '**',
        redirectTo: ''
      }
    ];


      import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomePage } from './features/public/home/home.component';
import { LoadingSpinnerComponent } from './shared/ui/loading-spinner/loading-spinner.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [/* tu componente principal aquí */]
})
export class AppModule {}
