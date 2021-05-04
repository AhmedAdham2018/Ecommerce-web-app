import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { IBasket } from './../shared/models/basket';



@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = env.apiUrl;

  private basketSource = new BehaviorSubject(null);

  basket$ = this.basketSource;

  constructor(private http: HttpClient) { }

  getBasketById(id: string){
    return this.http.get(this.baseUrl + 'basket?id=' + id).pipe(
      map((basket: IBasket) => {
        this.basket$.next(basket);
      })
    )
  }

  setBasket(basket: IBasket){
    return this.http.post(this.baseUrl + 'basket', basket).subscribe(
      (response: IBasket) => {
        this.basketSource.next(response)
      },
      error => {
        console.log(error); 
      }
    )
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }
}

