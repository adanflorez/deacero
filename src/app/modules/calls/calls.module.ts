import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import {
  CommunicationFormModule,
  DocumentsFormModule,
  GeneralProjectDataFormModule,
  LocationFormModule,
  ObjectivesFormModule,
  OtherDocumentsFormModule,
  PeriodFormModule,
  ProjectBudgetFormModule,
  ProjectDevelopmentFormModule,
  ProjectManagerFormModule,
  RatingFormModule,
} from 'src/app/shared/forms';

import { FormErrorModule } from '../../shared/form-error/form-error.module';
import { OpeningHoursTableModule } from './../../shared/tables/opening-hours-table/opening-hours-table.module';
import { CallsRoutingModule } from './calls-routing.module';
import { CallsComponent } from './calls.component';

@NgModule({
  declarations: [CallsComponent],
  imports: [
    CommonModule,
    CallsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorModule,
    NgxMaskModule.forChild(),
    NgSelectModule,
    NgbAlertModule,
    OpeningHoursTableModule,
    GeneralProjectDataFormModule,
    LocationFormModule,
    ProjectManagerFormModule,
    ProjectDevelopmentFormModule,
    PeriodFormModule,
    ObjectivesFormModule,
    ProjectBudgetFormModule,
    RatingFormModule,
    CommunicationFormModule,
    DocumentsFormModule,
    OtherDocumentsFormModule,
  ],
})
export class CallsModule {}
