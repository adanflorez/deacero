import { OpeningHoursTableModule } from './../../shared/tables/opening-hours-table/opening-hours-table.module';
import { FormErrorModule } from '../../shared/form-error/form-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { CallsRoutingModule } from './calls-routing.module';
import { CallsComponent } from './calls.component';
import { MembersComponent } from './components/members/members.component';
import { RemunerationTableComponent } from './components/remuneration-table/remuneration-table.component';
import { BudgetTableComponent } from './components/budget-table/budget-table.component';

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
  ],
})
export class CallsModule {}
