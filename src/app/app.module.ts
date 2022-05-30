import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { ViewproductComponent } from './components/viewproduct/viewproduct.component';

// ********** forms module ********** //
import { FormsModule } from '@angular/forms';
import { DeletemodalComponent } from './components/modals/deletemodal/deletemodal.component';
import { EditmodalComponent } from './components/modals/editmodal/editmodal.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    HomeComponent,
    AddproductComponent,
    ViewproductComponent,
    DeletemodalComponent,
    EditmodalComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }