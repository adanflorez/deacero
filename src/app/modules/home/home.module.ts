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

import { DonationsTableComponent } from './components/donations-table/donations-table.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent, ProductTableComponent, DonationsTableComponent],
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
})
export class HomeModule {}
