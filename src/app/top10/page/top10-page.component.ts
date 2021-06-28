import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { finalize } from 'rxjs/operators';
import { Top10Service } from '../top10.service';
import top10 from '../files/top10_data.json';
import listTypes from '../files/list_types.json';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-top10-page',
  templateUrl: './top10-page.component.html',
  styleUrls: ['./top10-page.component.scss'],
})
export class Top10Page implements OnInit {
  version: string | null = environment.version;
  products: any[] | undefined;
  filtered: any[] = [];
  isLoading = false;
  keywords: any = [];
  currentCount: any;
  lang: any = '';
  top10List = top10['top10_this_summer'];
  list_types = listTypes;
  showDescID: number;
  activeDisc: string;
  constructor(private router: Router, private top10Serice: Top10Service, private http: HttpClient) {}

  ngOnInit() {
    this.isLoading = true;
    this.showDescID = -1;
    this.activeDisc = this.list_types[0].description;
    if (this.router.url.indexOf('lang=sr') > -1) {
      this.lang = 'sr/';
    }
    this.top10Serice
      .getProducts()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((products: any[]) => {
        this.products = products;
        this.top10Serice.setProducts(products);
        this.top10List.forEach((element: any) => {
          this.filtered.push(this.top10Serice.getProductByID(element.id));
        });
      });

    console.log(this.list_types);
  }
  formatPrice(price: string) {
    return parseFloat(price);
  }

  onSelect(list: any) {
    this.top10List = top10[list.filename];
    this.activeDisc = list.description;
    this.filtered = [];
    this.top10List.forEach((element: any) => {
      this.filtered.push(this.top10Serice.getProductByID(element.id));
    });
  }

  showDesc(index: number) {
    this.showDescID = index;
  }
}
