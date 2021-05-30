import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from './shared/models/product';
import { IPagination } from './shared/models/pagination';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(private basketService: BasketService , private accountService: AccountService){}

  ngOnInit(): void {
    this.loadMyBasket();
    this.loadMyCurrentUser();
  }

  loadMyBasket(){
    const myBasketId = localStorage.getItem('basket_id');
    if (myBasketId) {
      this.basketService.getBasketById(myBasketId).subscribe(
        () => {
          console.log("init basket....");
        },error => {
          console.log(error);
        });
    }
  }

  loadMyCurrentUser(){
    const myUserToken = localStorage.getItem('token');
    this.accountService.loadCurrentUser(myUserToken).subscribe(
      () => console.log("User is loaded."),
      error => console.log(error)  
    );
  }
  
}
