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

import { UserImplementationRepository } from 'src/app/data/repositories/user/user-implementation.repository';
import { UserRepository } from 'src/app/domain/repositories/user.repository';
import { GetUserUseCases } from 'src/app/domain/usecases/user/get-user.usecase';

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
      useFactory: (userRepo: UserRepository) => new GetUserUseCases(userRepo),
      deps: [UserRepository],
    },
    {
      provide: UserRepository,
      useClass: UserImplementationRepository,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
