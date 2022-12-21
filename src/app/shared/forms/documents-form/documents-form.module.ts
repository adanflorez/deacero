import { NgModule } from '@angular/core';
import { DocumentsFormComponent } from './documents-form.component';
import { formModules } from '../modules';

@NgModule({
  declarations: [DocumentsFormComponent],
  imports: [...formModules],
  exports: [DocumentsFormComponent],
})
export class DocumentsFormModule {}
