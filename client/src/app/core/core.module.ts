import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ErrorTestComponent } from './error-test/error-test.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ToastrModule } from 'ngx-toastr';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { HeaderSectionComponent } from './header-section/header-section.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [NavBarComponent, ErrorTestComponent, NotFoundComponent, ServerErrorComponent, HeaderSectionComponent],
  imports: [
      CommonModule,
      RouterModule,
      ToastrModule.forRoot({
        positionClass: 'toast-bottom-right',
        preventDuplicates: true
      }),
      BreadcrumbModule,
      SharedModule 
  ],
  exports: [
      NavBarComponent,
      HeaderSectionComponent
  ]
})
export class CoreModule {}


