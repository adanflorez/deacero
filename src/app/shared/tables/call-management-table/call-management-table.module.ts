import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from 'src/app/shared/alert/alert.module';
import { FormErrorModule } from 'src/app/shared/form-error/form-error.module';

import { CallManagementTableComponent } from './call-management-table.component';
import { AnnouncementGateway, AnnouncementUseCase } from './domain';
import {
  AnnouncementImplementation,
  AnnouncementService,
} from './infrastructure';

@NgModule({
  declarations: [CallManagementTableComponent],
  imports: [
    CommonModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    FormErrorModule,
    AlertModule,
  ],
  exports: [CallManagementTableComponent],
  providers: [
    AnnouncementService,
    {
      provide: AnnouncementUseCase,
      useFactory: (announcementRepo: AnnouncementGateway) =>
        new AnnouncementUseCase(announcementRepo),
      deps: [AnnouncementGateway],
    },
    {
      provide: AnnouncementGateway,
      useClass: AnnouncementImplementation,
    },
  ],
})
export class CallManagementTableModule {}
