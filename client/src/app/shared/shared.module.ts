import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { TotalOrderComponent } from './components/total-order/total-order.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';




@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent, TotalOrderComponent, TextInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    TextInputComponent,
    TotalOrderComponent,
    CarouselModule,
    BsDropdownModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
