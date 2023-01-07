import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AlertModule } from 'src/app/shared/alert/alert.module';
import { FundManagerFormModule } from 'src/app/shared/forms/fund-manager-form/fund-manager-form.module';
import { GeneralDataFormModule } from 'src/app/shared/forms/general-data-form/general-data-form.module';
import { FormErrorModule } from 'src/app/shared/form-error/form-error.module';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { DonationsTableComponent } from './components/donations-table/donations-table.component';

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
  ],
})
export class HomeModule {}
