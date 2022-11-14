import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

interface Product {
  id: string;
  description: string;
  price: string;
  season: string;
  photo: string;
  available: string;
}

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.scss'],
})
export class ProductTableComponent {
  form: FormGroup;
  showForm = false;
  products: Product[] = [];
  validForm = false;

  constructor() {
    this.form = new FormGroup({
      description: new FormControl(''),
      price: new FormControl(''),
      available: new FormControl(''),
      season: new FormControl(''),
      photo: new FormControl(''),
    });
    this.form.valueChanges.subscribe((values) => {
      const { description, price, available, season, photo } = values;
      if (description || price || available || season || photo) {
        this.validForm = true;
        return;
      }
      this.validForm = false;
    });
  }

  showFormOnTable() {
    this.showForm = true;
  }

  addProduct() {
    if (!this.validForm) return;
    this.showForm = false;
    this.products.push({
      id: uuidv4(),
      ...this.form.value,
    });
    this.form.reset();
  }

  removeProduct(id: string) {
    this.products = this.products.filter((product) => product.id !== id);
  }
}
