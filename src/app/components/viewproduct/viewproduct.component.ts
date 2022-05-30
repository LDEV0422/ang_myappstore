import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { subscribeOn } from 'rxjs';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-viewproduct',
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  productData: any;
  id: any;
  
  // version of product that we'll edit
  newProductData: any = {
    id: "",
    name: "",
    description: "",
    image: "",
    price: ""
  };

  // notification after click on save changes (modal)
  notifState: boolean = false;
  notifContent: any;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    public notificationsService: NotificationsService
  ) { 

  }

  // Activated Route : to pass id as a parameter in the route for a single product
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.viewProduct();    
  }

  // display single product
  viewProduct() {
    this.productService.viewProduct(this.id)
      .subscribe({
        next: (response) => {
          this.productData = response;
          // console.log(this.productData);                   
        },
        error: (err) => {
          alert("No product found");
        }
      })
  }

  // pass v1 of product into new entity that we will edit in the edit modal
  createNewProdData() {
    this.newProductData = this.productData;
  }

  // show oldproduct if edition is cancelled
  viewOldProduct(oldProd: any) {
    this.productData = oldProd;
  }

  // show notification if update is SUCCESS
  saveChangesNotifOK() {
    this.notifContent = this.notificationsService.nContentSuccess;
    this.notifState = this.notificationsService.saveChangesNotifOK(this.notifState);
     
    
   
  }

  // show notification if update is ERROR
  saveChangesNotifERR() {
    this.notifState = true;
    // message + setTimeout
    this.notifContent = "An error occurred while saving the changes";
    setTimeout(() => {
      this.notifState = false;
    }, 6000);
  }

}
