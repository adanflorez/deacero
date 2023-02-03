import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { RequestTableComponent } from './components';
import { RequestImplementation, RequestService } from './infrastructure';
import { RequestsRoutingModule } from './requests-routing.module';
import { RequestsComponent } from './requests.component';
import { RequestGateway, RequestUseCase } from './domain';

@NgModule({
  declarations: [RequestsComponent, RequestTableComponent],
  imports: [
    CommonModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    RequestsRoutingModule,
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
