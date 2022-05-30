import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AddproductComponent } from "./components/addproduct/addproduct.component";
import { HomeComponent } from "./components/home/home.component";
import { ProductsComponent } from "./components/products/products.component";
import { ViewproductComponent } from "./components/viewproduct/viewproduct.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'addproduct', component: AddproductComponent },
  { path: 'viewproduct/:id', component: ViewproductComponent },
  // { path: '**', component: HomeComponent } // If no matching route found, go back to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
