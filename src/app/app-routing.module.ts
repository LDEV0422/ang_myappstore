import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AddproductComponent } from "./components/addproduct/addproduct.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { ProductsComponent } from "./components/products/products.component";
import { ViewproductComponent } from "./components/viewproduct/viewproduct.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'addproduct', component: AddproductComponent },
  { path: 'viewproduct/:id', component: ViewproductComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: HomeComponent } // If no matching route found, go back to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
