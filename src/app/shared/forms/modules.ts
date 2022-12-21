import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from '../alert/alert.module';
import { FormErrorModule } from '../form-error/form-error.module';

export const formModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  FormErrorModule,
  AlertModule,
];
