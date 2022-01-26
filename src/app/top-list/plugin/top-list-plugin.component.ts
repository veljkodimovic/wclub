import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { finalize } from 'rxjs/operators';
import { TopListService } from '../top-list.service';
import topListData from '../files/top_list_data.json';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/core';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

@Component({
  selector: 'app-top-list-plugin',
  templateUrl: './top-list-plugin.component.html',
  styleUrls: ['./top-list-plugin.component.scss'],
})
export class TopListPlugin implements OnInit {
  version: string | null = environment.version;
  products: any[] | undefined;
  filtered: any[] = [];
  isLoading = false;
  keywords: any = [];
  currentCount: any;
  lang: any = '';
  topList = topListData['winter_whiskies_2022_part_2'];
  constructor(private router: Router, private topListSerice: TopListService) {}

  ngOnInit() {
    this.isLoading = true;
    if (this.router.url.indexOf('lang=sr') > -1) {
      this.lang = 'sr/';
    }
    this.topListSerice
      .getProducts()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((products: any[]) => {
        this.products = products;
        this.topListSerice.setProducts(products);
        this.topList.forEach((element: any) => {
          let product = this.topListSerice.getProductByID(element.id);
          if (product) {
            this.filtered.push(product);
          }
        });
      });
  }

  formatPrice(price: string) {
    return parseFloat(price);
  }

  onSwiper(swiper: any) {}
  onSlideChange() {}
}
