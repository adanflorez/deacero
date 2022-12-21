import { NgModule } from '@angular/core';
import { CommunicationFormComponent } from './communication-form.component';
import { formModules } from '../modules';

@NgModule({
  declarations: [CommunicationFormComponent],
  imports: [...formModules],
  exports: [CommunicationFormComponent],
})
export class CommunicationFormModule {}
