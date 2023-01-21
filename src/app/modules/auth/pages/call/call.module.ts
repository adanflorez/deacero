import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CallRoutingModule } from './call-routing.module';
import { CallComponent } from './call.component';

@NgModule({
  declarations: [CallComponent],
  imports: [CommonModule, CallRoutingModule, ReactiveFormsModule],
})
export class CallModule {}
