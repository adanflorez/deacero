import { AnnouncementService } from './infrastructure/driven-adapters/services/announcement.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertModule } from 'src/app/shared/alert/alert.module';
import { FormErrorModule } from 'src/app/shared/form-error/form-error.module';

import { CallManagementTableComponent } from './call-management-table.component';
import { AnnouncementGateway } from './domain/gateway';
import { GetAnnouncementUseCase } from './domain/usecase/announcement/get-announcement.use-case';
import { AnnouncementImplementation } from './infrastructure/implementations/announcement-implementation';

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
      provide: GetAnnouncementUseCase,
      useFactory: (announcementRepo: AnnouncementGateway) =>
        new GetAnnouncementUseCase(announcementRepo),
      deps: [AnnouncementGateway],
    },
    {
      provide: AnnouncementGateway,
      useClass: AnnouncementImplementation,
    },
  ],
})
export class CallManagementTableModule {}
