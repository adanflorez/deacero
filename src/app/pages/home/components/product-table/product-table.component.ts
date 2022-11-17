import { ONLY_NUMBERS_PATTERN } from 'src/app/lib/constants';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  validForm = false;
  @Input() products: Product[] = [];
  @Output() productsList = new EventEmitter();
  productToEdit: Product;
  isEditMode = false;

  constructor() {
    this.form = new FormGroup({
      description: new FormControl(''),
      price: new FormControl('', Validators.pattern(ONLY_NUMBERS_PATTERN)),
      available: new FormControl(null),
      season: new FormControl(''),
      photo: new FormControl(''),
    });
    this.form.valueChanges.subscribe((values) => {
      const { description, price, available, season, photo } = values;
      if (description || price || available || season || photo) {
        this.validForm = this.form.valid && true;
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
    this.productsList.emit(this.products);
  }

  removeProduct(id: string) {
    this.products = this.products.filter((product) => product.id !== id);
    this.productsList.emit(this.products);
  }

  loadProductInFields(id: string) {
    const products = this.products.filter((product) => product.id === id);
    this.productToEdit = products[0];
    const { description, price, available, season, photo } = products[0];
    this.form.setValue({
      description,
      price,
      available,
      season,
      photo,
    });
    this.showForm = true;
    this.isEditMode = true;
  }

  editProduct() {
    this.productToEdit = { ...this.productToEdit, ...this.form.value };
    this.products = this.products.filter(
      (product) => product.id !== this.productToEdit.id
    );
    this.products.push(this.productToEdit);
    this.productsList.emit(this.products);
    this.showForm = false;
    this.isEditMode = false;
    this.form.reset();
  }

  get f() {
    return this.form.controls;
  }

  cancelEdit() {
    this.showForm = false;
    this.isEditMode = false;
    this.form.reset();
  }
}
