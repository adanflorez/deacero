import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsComponent } from './requests.component';
import { RequestTableComponent } from './components';

@NgModule({
  declarations: [RequestsComponent, RequestTableComponent],
  imports: [CommonModule, RequestsRoutingModule],
})
export class RequestsModule {}
