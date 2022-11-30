import { NavbarModule } from './shared/navbar/navbar.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingInterceptor } from './lib/interceptors/loading.interceptor';
import { TokenInterceptor } from './lib/interceptors/token.interceptor';

import { NgxMaskModule } from 'ngx-mask';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    NgbModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
