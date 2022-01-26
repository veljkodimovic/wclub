import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { DiscoveryModule } from './discovery/discovery.module';
import { ShellModule } from './shell/shell.module';
import { TopListModule } from './top-list/top-list.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    NgbModule,
    CoreModule,
    SharedModule,
    ShellModule,
    TopListModule,
    DiscoveryModule,
    SwiperModule,
    NgxUiLoaderModule,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  //providers: [],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
