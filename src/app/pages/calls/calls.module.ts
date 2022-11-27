import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CallsRoutingModule } from './calls-routing.module';
import { CallsComponent } from './calls.component';
import { MembersComponent } from './components/members/members.component';

@NgModule({
  declarations: [CallsComponent, MembersComponent],
  imports: [CommonModule, CallsRoutingModule, FormsModule, ReactiveFormsModule],
})
export class CallsModule {}
