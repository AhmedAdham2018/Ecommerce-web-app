import { Component, OnInit } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: IProduct[];
  productTypes: IType[];
  productBrands: IBrand[];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getTypes();
    this.getBrands();
  }

  getProducts(){
    this.shopService.getProducts().subscribe(
      response => {
        this.products = response.data;
      },
      error => {
        console.log(error); 
      }
    )
  }

  getTypes(){
    this.shopService.getTypes().subscribe(response => {
      this.productTypes = response;
    }, error => {
      console.log(error);
    });
  }

  getBrands(){
    this.shopService.getBrands().subscribe(response => {
      this.productBrands = response;
    }, error => {
      console.log(error);
      
    });
  }

}
