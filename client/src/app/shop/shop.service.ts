import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from './../shared/models/pagination';
import { IType } from '../shared/models/productType';
import { IBrand } from '../shared/models/brand';
import { ShopParams } from './../shared/models/shopParams';
import { IProduct } from './../shared/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  //baseUrl = 'https://localhost:5001/api/';
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams){
    let params = new HttpParams();
    if (shopParams.typeId !== 0) {
      params = params.append('typeId' , shopParams.typeId.toString());
    }
    if (shopParams.brandId !== 0) {
      params = params.append('brandId' , shopParams.brandId.toString());
    }
    if (shopParams.sort) {
      params = params.append('sort' , shopParams.sort);
    }
    if (shopParams.search) {
      params = params.append('search' , shopParams.search);
    }
    
    params = params.append('pageSize' , shopParams.pageSize.toString());
    params = params.append('pageIndex' , shopParams.pageNumber.toString());
 
    return this.http.get<IPagination>(this.baseUrl + 'products' ,
        {observe: 'response' , params}).pipe(
          map(response => {
            return response.body;
          })
        );
  }

  getProduct(id: number){
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getTypes(){
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }

  getBrands(){
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands');
  }
}
