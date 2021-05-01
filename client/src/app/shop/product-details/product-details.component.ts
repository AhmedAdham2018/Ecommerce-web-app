import { Component, OnInit } from '@angular/core';
import { ShopService } from './../shop.service';
import { IProduct } from './../../shared/models/product';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: IProduct;
  quantity = 0;

  constructor(private shopService: ShopService , private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadSelectedProduct();
  }

  loadSelectedProduct(){
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      product => {
        this.product = product; 
      },error => {
        console.log(error);
        
      }
    )
  }

  decrementQuantity(){
    this.quantity--;
  }

  incrementQuantity(){
    this.quantity++;
  }

  addItemToBasket(){

  }

}
