import { NgModule } from '@angular/core';
import { OrganizationalInformationFormComponent } from './organizational-information-form.component';
import { formModules } from '../modules';

@NgModule({
  declarations: [OrganizationalInformationFormComponent],
  imports: [...formModules],
  exports: [OrganizationalInformationFormComponent],
})
export class OrganizationalInformationFormModule {}
