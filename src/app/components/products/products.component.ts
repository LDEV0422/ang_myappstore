import { Component, OnInit} from '@angular/core';
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
  // products 
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
  selectedCategory:any;

  // PAGINATION
  page!: number;
  // set limit of products by page
  paginationLimit: number = 3;
  // to calculate total of pages
  totalPages: any;
  

  // inject service to use its methods
  constructor(private productService: ProductService, private categoriesService: CategoriesService, public authService: AuthService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
    this.paginateProducts(this.page);
  }

  // ********** CRUD ********** //

  getAllProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      // console.log(this.products)
    })

    // TODO: handle error
  }

  getAllCategories() {
    this.categoriesService.getCategories().subscribe(data => {
      this.categories = data;
      // console.log(this.products)
    })

    // TODO: handle error
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
    } else {
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
          } else {
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
  priceSortAsc() {
    this.productService.priceSortAsc().subscribe(response => {
      this.products = response;
    })
  }

  // sort products by price (asc)
  priceSortDesc() {
    this.productService.priceSortDesc().subscribe(response => {
      this.products = response;
    })
  }

  // price range
  priceRange() {
    // if form is empty
    if (this.priceForm.invalid) {

      // this.errorState = true;
      // this.errorMessagePrice = "Please indicate a price range";

      // show all products if form is empty
      this.getAllProducts();

      return;
    } else {
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
          } else {
            this.errorState = false;
          }
        },
        error: () => {
          this.errorState = true;
          this.errorMessagePrice = "No product found";
        }
      })
  }


  filterCategories(category: any) {
    this.selectedCategory = category;

    this.productService.filterCategory(this.selectedCategory)
    .subscribe((response) => {
      this.products = response;  
    })
    
  }

  // ********** END FILTERS ********** //

// ********** PAGINATION ********** //
// TODO: PAGINATE METHOD FOR EVERY FILTER
paginateProducts(page:any){
  // page = page + 1;
  // console.log("page number " + page);
  let productsAll: any;

  this.productService.getProducts().subscribe((response) => {
    productsAll = response;

    this.productService.paginateProducts(page, this.paginationLimit)
    .subscribe((response) => {
      this.products = response;
      let maxPage = Math.ceil(productsAll.length / this.paginationLimit);
      this.totalPages = new Array<number>(maxPage);
    });
  })
 
}
// ********** END PAGINATION ********** //
}
