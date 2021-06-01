import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
var httpOptions: any;

const routes = {
  products: () => `/products?per_page=100`,
};

export interface Products {
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class DiscoveryService {
  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient.get(routes.products()).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load joke :-('))
    );
  }
}
