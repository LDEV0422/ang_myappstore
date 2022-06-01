import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  categories: any;

  // ********** inject services ********** //
  constructor(private productService: ProductService, private categoriesService: CategoriesService, private router: Router) { }

  ngOnInit(): void {
    this.getAllCategories()
  }

  // ********** save product data ********** //
  saveProduct(product: any) {
    let data = product.value
    this.productService.saveProduct(data).subscribe(data => {

      console.log("Le produit a été enregistré.");
      this.router.navigate(['/products']);

    })
  }

  // ********** get categories in form ********** //
  getAllCategories() {
    this.categoriesService.getCategories().subscribe(data => {
      this.categories = data;
      // console.log(this.categories)
    })
  }

}
