import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from 'src/app/shared/alert/alert.module';
import { MembersTableModule } from './../../tables/members-table/members-table.module';
import { FormErrorModule } from './../../form-error/form-error.module';
import { GoverningBodyComponent } from './governing-body.component';

@NgModule({
  declarations: [GoverningBodyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormErrorModule,
    MembersTableModule,
    AlertModule,
  ],
  exports: [GoverningBodyComponent],
})
export class GoverningBodyModule {}
