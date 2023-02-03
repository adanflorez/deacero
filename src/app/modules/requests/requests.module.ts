import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { RequestTableComponent } from './components';
import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsComponent } from './requests.component';

@NgModule({
  declarations: [RequestsComponent, RequestTableComponent],
  imports: [CommonModule, NgbTypeaheadModule, RequestsRoutingModule],
})
export class RequestsModule {}
