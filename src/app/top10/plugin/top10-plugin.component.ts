import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { finalize } from 'rxjs/operators';
import { Top10Service } from '../top10.service';
import top10 from '../files/top10_data.json';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/core';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

@Component({
  selector: 'app-top10-plugin',
  templateUrl: './top10-plugin.component.html',
  styleUrls: ['./top10-plugin.component.scss'],
})
export class Top10Plugin implements OnInit {
  version: string | null = environment.version;
  products: any[] | undefined;
  filtered: any[] = [];
  isLoading = false;
  keywords: any = [];
  currentCount: any;
  lang: any = '';
  top10List = top10['top10_this_summer'];
  constructor(private router: Router, private top10Serice: Top10Service) {}

  ngOnInit() {
    this.isLoading = true;
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
          let product = this.top10Serice.getProductByID(element.id);
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
