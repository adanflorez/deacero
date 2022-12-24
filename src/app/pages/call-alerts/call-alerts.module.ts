import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallAlertsRoutingModule } from './call-alerts-routing.module';
import { CallAlertsComponent } from './call-alerts.component';

import { GeneralDataFormModule } from './../../shared/forms/general-data-form/general-data-form.module';
import { FundManagerFormModule } from './../../shared/forms/fund-manager-form/fund-manager-form.module';
import { OrganizationalInformationFormModule } from './../../shared/forms/organizational-information-form/organizational-information-form.module';
import { StrategicAlliancesFormModule } from './../../shared/forms/strategic-alliances-form/strategic-alliances-form.module';
import { DecentWorkFormModule } from './../../shared/forms/decent-work-form/decent-work-form.module';
import { RemunerationFormModule } from './../../shared/forms/remuneration-form/remuneration-form.module';
import { GoverningBodyModule } from './../../shared/forms/governing-body/governing-body.module';
import { GeneralProjectDataFormModule } from '../../shared/forms/general-project-data-form/general-project-data-form.module';
import { LocationFormModule } from './../../shared/forms/location-form/location-form.module';
import { ProjectManagerFormModule } from './../../shared/forms/project-manager-form/project-manager-form.module';
import { ProjectDevelopmentFormModule } from './../../shared/forms/project-development-form/project-development-form.module';
import { PeriodFormModule } from './../../shared/forms/period-form/period-form.module';
import { CommunicationFormModule } from './../../shared/forms/communication-form/communication-form.module';
import { ProjectBudgetFormModule } from './../../shared/forms/project-budget-form/project-budget-form.module';
import { DocumentsFormModule } from './../../shared/forms/documents-form/documents-form.module';
import { ObjectivesFormModule } from './../../shared/forms/objectives-form/objectives-form.module';
import { RatingFormModule } from './../../shared/forms/rating-form/rating-form.module';
import { ModalModule } from './../../shared/modal/modal.module';
import { AlertModule } from './../../shared/alert/alert.module';

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
    AlertModule,
    ModalModule,
  ],
})
export class CallAlertsModule {}
