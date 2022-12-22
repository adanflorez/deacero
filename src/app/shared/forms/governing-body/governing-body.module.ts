import { NgModule } from '@angular/core';
import { MembersTableModule } from './../../tables/members-table/members-table.module';
import { GoverningBodyComponent } from './governing-body.component';
import { formModules } from './../modules';

@NgModule({
  declarations: [GoverningBodyComponent],
  imports: [MembersTableModule, ...formModules],
  exports: [GoverningBodyComponent],
})
export class GoverningBodyModule {}
