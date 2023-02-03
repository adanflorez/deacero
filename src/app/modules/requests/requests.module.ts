import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { RequestTableComponent } from './components';
import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsComponent } from './requests.component';

@NgModule({
  declarations: [RequestsComponent, RequestTableComponent],
  imports: [
    CommonModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    RequestsRoutingModule,
  ],
})
export class RequestsModule {}
