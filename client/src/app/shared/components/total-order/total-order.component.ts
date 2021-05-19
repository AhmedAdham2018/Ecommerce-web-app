import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasketTotal } from './../../models/basketTotal';
import { BasketService } from './../../../basket/basket.service';

@Component({
  selector: 'app-total-order',
  templateUrl: './total-order.component.html',
  styleUrls: ['./total-order.component.scss']
})
export class TotalOrderComponent implements OnInit {

  basketTotal$: Observable<IBasketTotal>; 

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.basketTotal$ = this.basketService.basketTotal$;
  }

}


