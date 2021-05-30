import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket } from '../shared/models/basket';
import { BasketService } from './basket.service';
import { IBasketItem } from './../shared/models/basketItem';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  basket$: Observable<IBasket>;
  isBasket: true;

  constructor(private basketService: BasketService){ }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  incrementBasketItemQuantity(item: IBasketItem){
    this.basketService.incrementBasketItemQuantity(item);
  }

  decrementBasketItemQuantity(item: IBasketItem){
    this.basketService.decrementBasketItemQuantity(item);
  }

  removeBasketItem(item: IBasketItem){
    this.basketService.removeItemFromBasket(item);
  }

}
