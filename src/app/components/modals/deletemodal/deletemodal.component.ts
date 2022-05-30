import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-deletemodal',
  templateUrl: './deletemodal.component.html',
  styleUrls: ['./deletemodal.component.css']
})
export class DeletemodalComponent implements OnInit {
  @Input() deleteProductData: any;
  
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
  }

  deleteProduct(id: any) {
    this.productService.deleteProduct(this.deleteProductData.id).subscribe({
      next: (response) => {
        alert("Product " + this.deleteProductData.name + " has been deleted");
      },
      error: (err) => {
        alert("An error occurred while deleting the item " + this.deleteProductData.name);
      },
      complete: () => {
        // redirect to products page when product is deleted
        this.router.navigate(['/products']);
      }
    })
  }
}
