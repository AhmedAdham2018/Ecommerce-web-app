import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';




@NgModule({
  declarations: [NavBarComponent],
  imports: [
  CommonModule,
  RouterModule 
  ],
  exports: [
    NavBarComponent
  ]
})
export class CoreModule { }
