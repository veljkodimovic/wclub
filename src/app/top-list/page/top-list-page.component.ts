import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { finalize } from 'rxjs/operators';
import { TopListService } from '../top-list.service';
import topListData from '../files/top_list_data.json';
import listTypes from '../files/list_types.json';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-top-list-page',
  templateUrl: './top-list-page.component.html',
  styleUrls: ['./top-list-page.component.scss'],
})
export class TopListPage implements OnInit {
  version: string | null = environment.version;
  products: any[] | undefined;
  filtered: any[] = [];
  isLoading = false;
  keywords: any = [];
  currentCount: any;
  lang: any = '';
  topList = topListData['winter_whiskies_2022_part_2'];
  list_types = listTypes;
  showDescID: number;
  activeDisc: string;
  constructor(private router: Router, private topListService: TopListService, private http: HttpClient) {}

  ngOnInit() {
    this.isLoading = true;
    this.showDescID = -1;
    this.activeDisc = this.list_types[0].description;
    if (this.router.url.indexOf('lang=sr') > -1) {
      this.lang = 'sr/';
    }
    this.topListService
      .getProducts()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((products: any[]) => {
        this.products = products;
        this.topListService.setProducts(products);
        this.topList.forEach((element: any) => {
          let product = this.topListService.getProductByID(element.id);
          if (product) {
            this.filtered.push(product);
          }
        });
      });
  }

  formatPrice(price: string) {
    return parseFloat(price);
  }

  onSelect(list: any) {
    this.topList = topListData[list.filename];
    this.activeDisc = list.description;
    this.filtered = [];
    this.topList.forEach((element: any) => {
      let product = this.topListService.getProductByID(element.id);
      if (product) {
        this.filtered.push(product);
      }
    });
  }

  showDesc(index: number) {
    this.showDescID = index;
  }
}
