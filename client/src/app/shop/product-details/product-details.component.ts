import { Component, OnInit } from '@angular/core';
import { ShopService } from './../shop.service';
import { IProduct } from './../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from './../../basket/basket.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;
  quantity = 1;

  constructor(private shopService: ShopService,
              private activatedRoute: ActivatedRoute,
              private breadcrumbService: BreadcrumbService,
              private basketService: BasketService) { 
      this.breadcrumbService.set('@productDetails' , ''); 
  }

  ngOnInit(): void {
    this.loadSelectedProduct();
  }

  loadSelectedProduct(){
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      product => {
        this.product = product;
        this.breadcrumbService.set('@productDetails' , product.name); 
      },error => {
        console.log(error);
      }
    )
  }

  incrementQuantity(){
    this.quantity++;
  }

  decrementQuantity(){
    if (this.quantity > 1) {
      this.quantity--;
    }  
  }

  addItemToBasket(){
    this.basketService.addItemToBasket(this.product, this.quantity);
  }

}

