import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  // pass old product data to viewProduct (parent)
  @Output() cancelEditProductEvent = new EventEmitter<any>();

  // pass save click event to viewProductComponent (parent) =  show notification SUCCESS and ERROR
  @Output() saveChangesEventOK = new EventEmitter<any>();
  @Output() saveChangesEventERR = new EventEmitter<any>();

  // v1 of product to editComponent
  oldProductData: any;
  id: any;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  editProduct() {
    this.productService.editProduct(this.routeId, this.editProductData)
      .subscribe({
        next: (response) => {
          // alert(`Changes on ${this.editProductData.name} were saved successfully`);

          // pass save click event to viewProductComponent (parent) =  show notification IF SUCCESS
          this.saveChangesEventOK.emit();
        },
        error: (err) => {
          // alert("An error occurred while saving the changes");

          // pass save click event to viewProductComponent (parent) =  show notification IF ERROR
          this.saveChangesEventERR.emit();
        }
      })
  }

  // if edit is cancelled, get v1 of product and send it to parent component viewProduct
  cancelEdit(product: any) {
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
