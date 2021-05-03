import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-error-test',
  templateUrl: './error-test.component.html',
  styleUrls: ['./error-test.component.scss']
})
export class ErrorTestComponent implements OnInit {

  baseUrl = environment.apiUrl;
  validationErrors: any
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  get400(){
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }

  get400ValidatorErr(){
    this.http.get(this.baseUrl + 'products/fourtyfour').subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
        this.validationErrors = error.errors;
      }
    )
  }

  get404(){
    this.http.get(this.baseUrl + 'products/44').subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }

  get500(){
    this.http.get(this.baseUrl + 'buggy/server-error').subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }

}
