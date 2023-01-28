import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';

import { ManagementTableComponent } from './components';
import { MultisiteGateway, MultisiteUseCase } from './domain';
import { MultisiteImplementation, MultisiteService } from './infrastructure';
import { MultisiteManagementRoutingModule } from './multisite-management-routing.module';
import { MultisiteManagementComponent } from './multisite-management.component';

@NgModule({
  declarations: [MultisiteManagementComponent, ManagementTableComponent],
  imports: [
    CommonModule,
    NgbTypeaheadModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    MultisiteManagementRoutingModule,
  ],
  providers: [
    MultisiteService,
    {
      provide: MultisiteUseCase,
      useFactory: (multisiteGateway: MultisiteGateway) =>
        new MultisiteUseCase(multisiteGateway),
      deps: [MultisiteGateway],
    },
    {
      provide: MultisiteGateway,
      useClass: MultisiteImplementation,
    },
  ],
})
export class MultisiteManagementModule {}
