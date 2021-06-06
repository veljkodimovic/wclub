import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DiscoveryService } from '../discovery.service';
import { Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FilterByTastePipe } from '../../pipes/filterByTaste.pipe';
//import { HTTPClientFactory, SimpleProduct } from '@woocommerce/api';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import { Router } from '@angular/router';

//import * as am4plugins from "@amcharts/amcharts4/plugins/sunburst";
//import * as d3geo from "d3-geo";

@Component({
  selector: 'by-country',
  templateUrl: './byCountry.component.html',
  styleUrls: ['./byCountry.component.scss'],
})
export class ByCountryComponent implements OnInit {
  products: any[] | undefined;
  isLoading = false;
  keywords: any = [];
  currentCount: any;
  lang: any = '';
  //private map = am4core.create('chartdiv', am4maps.MapChart);
  chart = am4core.create('chartdiv', am4maps.MapChart);
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private zone: NgZone,
    private discoveryService: DiscoveryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    if (this.router.url.indexOf('lang=sr') > -1) {
      this.lang = 'sr/';
    }
    this.discoveryService
      .getProducts()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((products: any[]) => {
        this.products = products;
      });
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    // am4core.ready(function () {
    this.browserOnly(() => {
      //am4core.useTheme(am4themes_animated);
      let keywords: string[] = [];
      this.chart = am4core.create('chartdiv', am4maps.MapChart);
      this.chart.geodata = am4geodata_worldLow;
      this.chart.projection = new am4maps.projections.Miller();

      var polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.mapPolygons.template.strokeWidth = 0.5;

      // Exclude Antartica
      polygonSeries.exclude = ['AQ'];

      // Make map load polygon (like country names) data from GeoJSON
      polygonSeries.useGeodata = true;

      polygonSeries.data = [
        {
          id: 'US',
          fill: am4core.color('#dab879'),
          cursor: am4core.MouseCursorStyle.pointer,
          hoverable: true,
        },
        {
          id: 'JP',
          fill: am4core.color('#dab879'),
          cursor: am4core.MouseCursorStyle.pointer,
          hoverable: true,
        },
        {
          id: 'IN',
          fill: am4core.color('#dab879'),
          cursor: am4core.MouseCursorStyle.pointer,
          hoverable: true,
        },
        {
          id: 'BE',
          fill: am4core.color('#dab879'),
          cursor: am4core.MouseCursorStyle.pointer,
          hoverable: true,
        },
        {
          id: 'GB',
          fill: am4core.color('#dab879'),
          cursor: am4core.MouseCursorStyle.pointer,
          hoverable: true,
        },
        {
          id: 'TW',
          fill: am4core.color('#dab879'),
          cursor: am4core.MouseCursorStyle.pointer,
          hoverable: true,
        },
        {
          id: 'IE',
          fill: am4core.color('#dab879'),
          cursor: am4core.MouseCursorStyle.pointer,
          hoverable: true,
        },
        {
          id: 'CA',
          fill: am4core.color('#dab879'),
          cursor: am4core.MouseCursorStyle.pointer,
          hoverable: true,
        },
      ];

      // Configure series
      var polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = '{name}';
      polygonTemplate.fill = am4core.color('#e0e0e0');
      polygonTemplate.propertyFields.fill = 'fill';
      //polygonTemplate.propertyFields.cursorOverStyle = "cursor";
      polygonTemplate.interactionsEnabled = false;
      polygonTemplate.propertyFields.interactionsEnabled = 'hoverable';

      // Create hover state and set alternative fill color
      var hs = polygonTemplate.states.create('hover');
      hs.properties.fill = am4core.color('#b29763');

      // Create active state
      // var activeState = polygonTemplate.states.create("active");
      // activeState.properties.fill = am4core.color("#b29763");

      polygonTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer;

      // Create an event to toggle "active" state
      polygonTemplate.events.on(
        'hit',
        function (ev: any) {
          let selected: string = ev.target.dataItem.dataContext.name;
          keywords = [selected.toLowerCase().replace(' ', '-')];
          let transpond: string[] = [];
          keywords.forEach((element) => {
            element = element.trim();

            transpond.push(element);
          });
          this.keywords = transpond;
          console.log(this.keywords);
        },
        this
      );
    });
    //});
  }

  formatPrice(price: string) {
    return parseFloat(price);
  }

  setCount(value: any) {
    this.currentCount = value;
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      // if (this.chart) {
      //   this.chart.dispose();
      //}
    });
  }
}
