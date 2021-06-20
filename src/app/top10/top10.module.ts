import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared';
import { Top10RoutingModule } from './top10-routing.module';
import { Top10Plugin } from './plugin/top10-plugin.component';
import { Top10Page } from './page/top10-page.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [CommonModule, SharedModule, TranslateModule, Top10RoutingModule, SwiperModule],
  declarations: [Top10Plugin, Top10Page],
})
export class Top10Module {}
