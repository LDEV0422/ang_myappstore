import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // products array : get its data using the products() method  
  products: any;
  productData: any;

  // search form
  form = new FormGroup({
    search: new FormControl(null, Validators.required),
  });

  // error message
  errorState: boolean = false;
  errorMessage!: string;

  // inject service to use its methods
  constructor(private productService: ProductService, public authService: AuthService) { }

  ngOnInit(): void {
    this.getAllProducts()
  }

  // ********** CRUD ********** //

  getAllProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      // console.log(this.products)
    })
  }


  // search products 
  searchProduct() {

    // if form is empty
    if (this.form.invalid) {
      this.errorState = true;
      this.errorMessage = "Please indicate your request";
      return;
    }else{
      this.errorState = false;
    }

    // search by product name (like)
    this.productService.searchProduct(this.form.get('search')?.value)
      .subscribe({
        next: (response) => {
          this.products = response;
          console.log(this.products);
          if (response.length == 0) {
            this.errorState = true;
            this.errorMessage = "No product found";
          } else{
            this.errorState = false;
          }
        },
        error: () => {
          this.errorState = true;
          this.errorMessage = "No product found";
        }
      })
  }


  // sort products by price (asc)
  priceSortAsc(){
    this.productService.priceSortAsc().subscribe( response => {
      this.products = response;
    })
  }

  // sort products by price (asc)
  priceSortDesc(){
    this.productService.priceSortDesc().subscribe( response => {
      this.products = response;
    })
  }

}
