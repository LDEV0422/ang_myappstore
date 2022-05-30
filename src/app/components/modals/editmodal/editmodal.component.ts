import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-editmodal',
  templateUrl: './editmodal.component.html',
  styleUrls: ['./editmodal.component.css']
})
export class EditmodalComponent implements OnInit {
  // pass data from viewProductComponent (parent)
  @Input() editProductData: any;
  @Input() routeId: any;
  // pass data to viewProductComponent (parent)
  @Output() cancelEditProductEvent = new EventEmitter<any>();

  oldProductData: any;
  id: any;
  notifState: boolean = false;

  constructor(private productService: ProductService, private notificationsService: NotificationsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {  
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  editProduct(){    
    this.productService.editProduct(this.routeId, this.editProductData)
    .subscribe({
      next: (response) => {
        // alert(`Changes on ${this.editProductData.name} were saved successfully`);

        this.notifState = this.notificationsService.editProductNotif(this.notifState);
        console.log(this.notifState);
        
      },
      error: (err) => {
        alert("An error occurred while saving the changes");
      }
    })
  }

  // if cancel, get v1 of product and send it to parent component viewProduct
  cancelEdit(product: any){
    this.productService.viewProduct(this.id)
      .subscribe({
        next: (response) => {
          this.oldProductData = response; 
          // console.log(this.oldProductData); 

          // to pass oldProductData to viewProduct (parent) on cancel edit
          this.cancelEditProductEvent.emit(this.oldProductData);                
        },
        error: (err) => {
          alert("No product found");
        }
      }) 
  }

}
