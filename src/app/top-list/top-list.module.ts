import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared';
import { TopListRoutingModule } from './top-list-routing.module';
import { TopListPlugin } from './plugin/top-list-plugin.component';
import { TopListPage } from './page/top-list-page.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [CommonModule, SharedModule, TranslateModule, TopListRoutingModule, SwiperModule],
  declarations: [TopListPlugin, TopListPage],
})
export class TopListModule {}
