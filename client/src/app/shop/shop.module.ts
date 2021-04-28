import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ProductsItemComponent } from './products-item/products-item.component';



@NgModule({
  declarations: [ShopComponent, ProductsItemComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ShopComponent
  ]
})
export class ShopModule { }
