import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersTableComponent } from './members-table.component';

@NgModule({
  declarations: [MembersTableComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [MembersTableComponent],
})
export class MembersTableModule {}
