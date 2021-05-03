import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  bRequestCount = 0;

  constructor(private spinner: NgxSpinnerService) { }

  busy(){
    this.bRequestCount++;
    this.spinner.show();
  }

  idle(){
    this.bRequestCount--;
    if (this.bRequestCount <= 0) {
      this.bRequestCount = 0;
      this.spinner.hide();
    }
  }
}
