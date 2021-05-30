import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket } from './../../shared/models/basket';
import { BasketService } from './../../basket/basket.service';
import { IUser } from './../../shared/models/user';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {
  basket$: Observable<IBasket>;
  currentUser$: Observable<IUser>;

  constructor(private basketService: BasketService , private accountService: AccountService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.accountService.currentUser$;
  }

  onSignOut(){
    this.accountService.logout();
  }

}
