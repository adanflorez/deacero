import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallAlertsRoutingModule } from './call-alerts-routing.module';
import { CallAlertsComponent } from './call-alerts.component';

import { ModalModule } from '../../shared/modal/modal.module';
import { AlertModule } from '../../shared/alert/alert.module';
import {
  CommunicationFormModule,
  DecentWorkFormModule,
  DocumentsFormModule,
  FundManagerFormModule,
  GeneralDataFormModule,
  GeneralProjectDataFormModule,
  GoverningBodyModule,
  LocationFormModule,
  ObjectivesFormModule,
  OrganizationalInformationFormModule,
  OtherDocumentsFormModule,
  PeriodFormModule,
  ProjectBudgetFormModule,
  ProjectDevelopmentFormModule,
  ProjectManagerFormModule,
  RatingFormModule,
  RemunerationFormModule,
  StrategicAlliancesFormModule,
} from 'src/app/shared/forms';

@NgModule({
  declarations: [CallAlertsComponent],
  imports: [
    CommonModule,
    CallAlertsRoutingModule,
    GeneralDataFormModule,
    FundManagerFormModule,
    OrganizationalInformationFormModule,
    StrategicAlliancesFormModule,
    DecentWorkFormModule,
    GoverningBodyModule,
    RemunerationFormModule,
    GeneralProjectDataFormModule,
    LocationFormModule,
    ProjectManagerFormModule,
    ProjectDevelopmentFormModule,
    PeriodFormModule,
    CommunicationFormModule,
    ProjectBudgetFormModule,
    DocumentsFormModule,
    ObjectivesFormModule,
    RatingFormModule,
    OtherDocumentsFormModule,
    AlertModule,
    ModalModule,
  ],
})
export class CallAlertsModule {}
