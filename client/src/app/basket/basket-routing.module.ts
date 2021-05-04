import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';

const routes: Routes = [
  {path: '' , component: BasketComponent}
];


@NgModule({
  declarations: [],
  imports: [
  CommonModule,
  RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class BasketRoutingModule { }
