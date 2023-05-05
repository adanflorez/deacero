import { HomeApplicationImplementation } from './infrastructure/implementations/home-application-implementation';
import { HomeApplicationUseCase } from './domain/usecase/home-application.use-case';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { AlertModule } from 'src/app/shared/alert/alert.module';
import { FormErrorModule } from 'src/app/shared/form-error/form-error.module';
import {
  DecentWorkFormModule,
  FundManagerFormModule,
  GeneralDataFormModule,
  GoverningBodyModule,
  OrganizationalInformationFormModule,
  RemunerationFormModule,
  StrategicAlliancesFormModule,
} from 'src/app/shared/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeService } from './infrastructure';
import { HomeApplicationGateway } from './domain';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    FormErrorModule,
    NgbModalModule,
    NgxMaskModule.forChild(),
    NgSelectModule,
    GeneralDataFormModule,
    FundManagerFormModule,
    OrganizationalInformationFormModule,
    StrategicAlliancesFormModule,
    DecentWorkFormModule,
    GoverningBodyModule,
    RemunerationFormModule,
  ],
  providers: [
    HomeService,
    {
      provide: HomeApplicationUseCase,
      useFactory: (homeApplicationGateway: HomeApplicationGateway) =>
        new HomeApplicationUseCase(homeApplicationGateway),
      deps: [HomeApplicationGateway],
    },
    {
      provide: HomeApplicationGateway,
      useClass: HomeApplicationImplementation,
    },
  ],
})
export class HomeModule {}
