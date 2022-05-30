import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  // ********** inject product service ********** //
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  // ********** save product data ********** //
  saveProduct(product:any){
    let data = product.value
    this.productService.saveProduct(data).subscribe(data => {

      console.log("Le produit a été enregistré.");
      this.router.navigate(['/products']);

    })
  }

}
