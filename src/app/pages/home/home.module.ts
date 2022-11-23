import { FormErrorModule } from './../../shared/form-error/form-error.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertModule } from 'src/app/shared/alert/alert.module';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { DonationsTableComponent } from './components/donations-table/donations-table.component';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HomeComponent,
    ProductTableComponent,
    DonationsTableComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule,
    FormErrorModule,
    NgbModalModule
  ]
})
export class HomeModule { }
