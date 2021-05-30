import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { Basket, IBasket } from './../shared/models/basket';
import { IProduct } from 'src/app/shared/models/product';
import { IBasketItem } from './../shared/models/basketItem';
import { IBasketTotal } from '../shared/models/basketTotal';


@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = env.apiUrl;

  private basketSource = new BehaviorSubject<IBasket>(null);

  basket$ = this.basketSource.asObservable();

  private basketTotalSource = new BehaviorSubject<IBasketTotal>(null);

  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasketById(id: string){
    return this.http.get(this.baseUrl + 'basket?id=' + id).pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket)
        this.calculateBasketTotal();
        //console.log(this.getCurrentBasketValue());
      })
    )
  }

  addItemToBasket(item: IProduct , quantity: number = 1){
    const itemToBasket: IBasketItem = this.mapProductToBasketItem(item , quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.updateOrAddItem(basket.items , itemToBasket , quantity);
    this.setBasket(basket);
  }

  incrementBasketItemQuantity(item: IBasketItem){
    const basket = this.getCurrentBasketValue();
    const index = basket.items.findIndex(x => x.id === item.id);
    basket.items[index].quantity++;
    this.setBasket(basket);
  }

  decrementBasketItemQuantity(item: IBasketItem){
    const basket = this.getCurrentBasketValue();
    const index = basket.items.findIndex(x => x.id === item.id);
    if (basket.items[index].quantity > 1) {
      basket.items[index].quantity--;
      this.setBasket(basket);
    } else {
      this.removeItemFromBasket(item);
    }
  }

  private updateOrAddItem(items: IBasketItem[], itemToBasket: IBasketItem, quantity: number): IBasketItem[] {
    const index = items.findIndex(i => i.id === itemToBasket.id);
    if (index === -1) {
      itemToBasket.quantity = quantity;
      items.push(itemToBasket);
      
    }else{
    items[index].quantity += quantity;
    }
    return items;
  }

  createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id' , basket.id);
    return basket;
  }

  mapProductToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      brand: item.productBrand,
      type: item.productType,
      quantity
    };
  }

  setBasket(basket: IBasket){
    return this.http.post(this.baseUrl + 'basket', basket)
        .subscribe((response: IBasket) => {
            this.basketSource.next(response);
            //console.log(response);
            this.calculateBasketTotal(); 
        },
          error => {
            console.log(error); 
        });
  }

  removeItemFromBasket(item: IBasketItem){
    const basket = this.getCurrentBasketValue();
    if (basket.items.some(x => x.id === item.id)) {
      basket.items = basket.items.filter(i => i.id !== item.id);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      }else{
        this.removeBasket(basket)
      }
    }
  }

  removeBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id)
      .subscribe(
        () => {
          this.basketSource.next(null);
          this.basketTotalSource.next(null);
          localStorage.removeItem('basket_id');
        },
        error => console.log(error)
      );
  }

  private calculateBasketTotal(){
    const basket = this.getCurrentBasketValue();
    const shipping = 0;
    const subTotal = basket.items.reduce((x , y) => (y.price * y.quantity) + x , 0);
    const total = shipping + subTotal;
    this.basketTotalSource.next({
      shipping,
      subTotal,
      total
    });
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }
}


