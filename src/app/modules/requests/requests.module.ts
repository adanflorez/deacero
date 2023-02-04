import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { RequestTableComponent } from './components';
import { RequestGateway, RequestUseCase } from './domain';
import { RequestImplementation, RequestService } from './infrastructure';
import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsComponent } from './requests.component';

@NgModule({
  declarations: [RequestsComponent, RequestTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RequestsRoutingModule,
    NgbTypeaheadModule,
    NgbAlertModule,
  ],
  providers: [
    RequestService,
    {
      provide: RequestUseCase,
      useFactory: (requestGateway: RequestGateway) =>
        new RequestUseCase(requestGateway),
      deps: [RequestGateway],
    },
    {
      provide: RequestGateway,
      useClass: RequestImplementation,
    },
  ],
})
export class RequestsModule {}
