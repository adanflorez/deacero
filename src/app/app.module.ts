import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { GetUserUseCases, UserGateway } from 'src/app/domain';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { UserImplementation } from './infrastructure/implementations/user-implementation';
import { NavbarModule } from './shared/navbar/navbar.module';

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
    {
      provide: GetUserUseCases,
      useFactory: (userGateway: UserGateway) =>
        new GetUserUseCases(userGateway),
      deps: [UserGateway],
    },
    {
      provide: UserGateway,
      useClass: UserImplementation,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
