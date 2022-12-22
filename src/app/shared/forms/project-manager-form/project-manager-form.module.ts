import { NgModule } from '@angular/core';
import { ProjectManagerFormComponent } from './project-manager-form.component';
import { formModules } from '../modules';

@NgModule({
  declarations: [ProjectManagerFormComponent],
  imports: [...formModules],
  exports: [ProjectManagerFormComponent],
})
export class ProjectManagerFormModule {}
