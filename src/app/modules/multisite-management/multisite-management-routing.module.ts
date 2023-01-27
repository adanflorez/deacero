import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultisiteManagementComponent } from './multisite-management.component';

const routes: Routes = [
  {
    path: '',
    component: MultisiteManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultisiteManagementRoutingModule {}
