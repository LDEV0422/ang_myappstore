import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  // ********** HTTP METHOD ********** //

  // get method to get products data => to products page
  getProducts() {
    return this.http.get<any>("http://localhost:3000/products/");
  }


  // post method to save new product data to server (inject this method in addproduct component) => to products page
  saveProduct(product: any) {
    return this.http.post<any>("http://localhost:3000/products/", product);
  }

  // get method to get one product
  viewProduct(id: any) {
    return this.http.get<any>(`http://localhost:3000/products/${id}`);
  }
  
  // to edit/update product
  editProduct(id: any, product: any) {
    return this.http.put<any>("http://localhost:3000/products/" + id, product);
  }

  // delete method to delete data for one product (specify id and name) => stay on products page (refresh)
  deleteProduct(id: any) {
    return this.http.delete<any>("http://localhost:3000/products/" + id);
  }
}
