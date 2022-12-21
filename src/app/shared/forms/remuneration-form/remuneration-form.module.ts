import { NgModule } from '@angular/core';
import { RemunerationTableModule } from './../../tables/remuneration-table/remuneration-table.module';
import { RemunerationFormComponent } from './remuneration-form.component';
import { formModules } from '../modules';

@NgModule({
  declarations: [RemunerationFormComponent],
  imports: [RemunerationTableModule, ...formModules],
  exports: [RemunerationFormComponent],
})
export class RemunerationFormModule {}
