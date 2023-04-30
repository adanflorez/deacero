import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import {
  GeneralProjectDataFormModule,
  LocationFormModule,
  ObjectivesFormModule,
  PeriodFormModule,
  ProjectDevelopmentFormModule,
  ProjectManagerFormModule,
} from 'src/app/shared/forms';

import { FormErrorModule } from '../../shared/form-error/form-error.module';
import { OpeningHoursTableModule } from './../../shared/tables/opening-hours-table/opening-hours-table.module';
import { CallsRoutingModule } from './calls-routing.module';
import { CallsComponent } from './calls.component';
import { BudgetTableComponent } from './components/budget-table/budget-table.component';
import { MembersComponent } from './components/members/members.component';
import { RemunerationTableComponent } from './components/remuneration-table/remuneration-table.component';
import { CallsGateway, CallsUseCase } from './domain';
import { CallsService } from './infrastructure';
import { CallsImplementation } from './infrastructure/implementations';

@NgModule({
  declarations: [
    CallsComponent,
    MembersComponent,
    RemunerationTableComponent,
    BudgetTableComponent,
  ],
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
  ],
  providers: [
    CallsService,
    {
      provide: CallsUseCase,
      useFactory: (callsGateway: CallsGateway) =>
        new CallsUseCase(callsGateway),
      deps: [CallsGateway],
    },
    {
      provide: CallsGateway,
      useClass: CallsImplementation,
    },
  ],
})
export class CallsModule {}
