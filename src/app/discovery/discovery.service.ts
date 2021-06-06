import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
var httpOptions: any;

const routes = {
  products_en: () => `/products?per_page=100&status=publish&category=175&lang=en`,
  products_sr: () => `/products?per_page=100&status=publish&category=187&lang=sr`,
};

export interface Products {
  category: string;
}

@Injectable({
  providedIn: 'root',
})
export class DiscoveryService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  getProducts() {
    let route;
    if (this.router.url.indexOf('lang=sr') > -1) {
      route = routes.products_sr();
    } else {
      route = routes.products_en();
    }

    return this.httpClient.get(route).pipe(
      map((body: any) => body),
      catchError(() => of('Error, could not load joke :-('))
    );
  }
}
