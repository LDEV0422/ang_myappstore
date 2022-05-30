import { Component, OnInit } from '@angular/core';
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
  // inject product service to use its methods
  constructor(private productService: ProductService) { }

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


}
