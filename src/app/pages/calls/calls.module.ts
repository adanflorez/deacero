import { FormErrorModule } from './../../shared/form-error/form-error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';

import { CallsRoutingModule } from './calls-routing.module';
import { CallsComponent } from './calls.component';
import { MembersComponent } from './components/members/members.component';
import { RemunerationTableComponent } from './components/remuneration-table/remuneration-table.component';

@NgModule({
  declarations: [CallsComponent, MembersComponent, RemunerationTableComponent],
  imports: [
    CommonModule,
    CallsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorModule,
    NgxMaskModule.forChild(),
    NgSelectModule,
  ],
})
export class CallsModule {}
