import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent {
  form: FormGroup;
  showForm = false;

  constructor() {
    this.form = new FormGroup({
      description: new FormControl(''),
      price: new FormControl(''),
      available: new FormControl(''),
      season: new FormControl(''),
      photo: new FormControl(''),
    });
  }

  showFormOnTable() {
    this.showForm = true;
  }

  addProduct() {
    this.showForm = false;
  }
}
