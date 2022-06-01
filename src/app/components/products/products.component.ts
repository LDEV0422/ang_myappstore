import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
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
  searchForm = new FormGroup({
    search: new FormControl(null, Validators.required),
  });

  // price range form
  priceForm = new FormGroup({
    minPrice: new FormControl(null, Validators.required),
    maxPrice: new FormControl(null, Validators.required),
  });

  // error message
  errorState: boolean = false;
  errorMessageSearch!: string;
  errorMessagePrice!: string;

  // categories filter
  categories!: string[];

  // inject service to use its methods
  constructor(private productService: ProductService, private categoriesService: CategoriesService, public authService: AuthService) { }

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

// ********** FILTERS ********** //
  // search products 
  searchProduct() {

    // if form is empty
    if (this.searchForm.invalid) {

      this.errorState = true;
      this.errorMessageSearch = "Please indicate your request";

      // show all products if form is empty
      this.getAllProducts();

      return;
    }else{
      this.errorState = false;
    }

    // search by product name (like)
    this.productService.searchProduct(this.searchForm.get('search')?.value)
      .subscribe({
        next: (response) => {
          this.products = response;
          console.log(this.products);
          if (response.length == 0) {
            this.errorState = true;
            this.errorMessageSearch = "No product found";
          } else{
            this.errorState = false;
          }
        },
        error: () => {
          this.errorState = true;
          this.errorMessageSearch = "No product found";
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

  // price range
  priceRange(){
    // if form is empty
    if (this.priceForm.invalid) {

      this.errorState = true;
      this.errorMessagePrice = "Please indicate a price range";

      // show all products if form is empty
      this.getAllProducts();

      return;
    }else{
      this.errorState = false;
    }

    // filter by price range (min / max)
    this.productService.priceRange(this.priceForm.get('minPrice')?.value, this.priceForm.get('maxPrice')?.value)
      .subscribe({
        next: (response) => {
          this.products = response;
          
          if (response.length == 0) {
            this.errorState = true;
            this.errorMessagePrice = "No product found in this price range";
          } else{
            this.errorState = false;
          }
        },
        error: () => {
          this.errorState = true;
          this.errorMessagePrice = "No product found";
        }
      })
  }

  filterCategory(){
    this.categoriesService.getCategories()
    .subscribe({
      next: (response) => {
        this.categories = response;
        console.log(this.categories);
        
        // if (response.length == 0) {
        //   this.errorState = true;
        //   this.errorMessagePrice = "No product found in this price range";
        // } else{
        //   this.errorState = false;
        // }
      },
      error: () => {
        // this.errorState = true;
        // this.errorMessagePrice = "No product found";
      }
    })
  }

// ********** END FILTERS ********** //


}
