import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { ErrorTestComponent } from './core/error-test/error-test.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path: '' , component: HomeComponent , data: {breadcrumb: 'Home'}},
  {path: 'error-test' , component: ErrorTestComponent , data: {breadcrumb: 'Test Errors'}},
  {path: 'not-found' , component: NotFoundComponent , data: {breadcrumb: 'Not Found'}},
  {path: 'server-error' , component: ServerErrorComponent , data: {breadcrumb: 'Server Error'}},
  {path: 'shop' ,loadChildren: () => import('./shop/shop.module').then(module => module.ShopModule),
        data: {breadcrumb: 'Shop'}},
  {path: 'basket' , loadChildren: () => import('./basket/basket.module').then(module => module.BasketModule),
         data: {breadcrumb: 'Basket'}},
  {path: 'account' , loadChildren: () => import('./account/account.module').then(module => module.AccountModule),
         data: {breadcrumb: {skip: true}}},       
  {path: 'checkout' , loadChildren: () => import('./checkout/checkout.module').then(module => module.CheckoutModule),
         data: {breadcrumb: 'Checkout'} , canActivate: [AuthGuard]},              
  {path: '**' , redirectTo: 'not-found' , pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
