import { NgModule } from '@angular/core';
import { OtherDocumentsFormComponent } from './other-documents-form.component';
import { formModules } from '../modules';

@NgModule({
  declarations: [OtherDocumentsFormComponent],
  imports: [...formModules],
  exports: [OtherDocumentsFormComponent],
})
export class OtherDocumentsFormModule {}
