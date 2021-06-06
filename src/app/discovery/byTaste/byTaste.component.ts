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
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4plugins from '@amcharts/amcharts4/plugins/sunburst';
import { SunburstDataItem } from '@amcharts/amcharts4/plugins/sunburst';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './byTaste.component.html',
  styleUrls: ['./byTaste.component.scss'],
})
export class ByTasteComponent implements OnInit {
  products: any[] | undefined;
  isLoading = false;
  keywords: any = [];
  currentCount: any;
  lang: any = '';
  chart = am4core.create('chartdiv', am4plugins.Sunburst);
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
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);
      let keywords: string[] = [];
      this.chart = am4core.create('chartdiv', am4plugins.Sunburst);

      this.chart.radius = am4core.percent(100);
      this.chart.colors.step = 2;
      this.chart.data = [
        {
          name: 'Flavours',
          color: am4core.color('#ffffff'),
          value: '100',
          children: [
            {
              name: 'Woody',
              color: am4core.color('#94826c'),
              value: '16.67',
              children: [
                {
                  name: 'Vanilla',
                  color: am4core.color('#897864'),
                  value: '5.5',
                  children: [
                    {
                      name: 'Coconut, vanilla pod, marshmallow, caramel, marzipan',
                      color: am4core.color('#6f5c46'),
                      value: '5.5',
                    },
                  ],
                },
                {
                  name: 'Wood type',
                  color: am4core.color('#897864'),
                  value: '5.5',
                  children: [
                    {
                      name: 'Oaky, piney, mahogany, fir tree',
                      color: am4core.color('#6f5c46'),
                      value: '5.5',
                    },
                  ],
                },
                {
                  name: 'Old wood',
                  color: am4core.color('#897864'),
                  value: '5.5',
                  children: [
                    {
                      name: 'Antique furniture, cigar box, dusty,  polish',
                      color: am4core.color('#6f5c46'),
                      value: '5.5',
                    },
                  ],
                },
              ],
            },
            {
              name: 'Fruity',
              color: am4core.color('#b39760'),
              value: '16.67',
              children: [
                {
                  name: 'Confectionery',
                  color: am4core.color('#b29350'),
                  value: '5.5',
                  children: [
                    {
                      name: 'Boiled sweet, liquorice, fruitchew, turkish delight',
                      color: am4core.color('#b18124'),
                      value: '5.5',
                    },
                  ],
                },
                {
                  name: 'Citrus',
                  color: am4core.color('#b29350'),
                  value: '5.5',
                  children: [
                    {
                      name: 'Lemon zeist, lemon peel, grapefruit  flesh, burnt mandaring peel',
                      color: am4core.color('#b18124'),
                      value: '5.5',
                    },
                  ],
                },
                {
                  name: 'Fruit',
                  color: am4core.color('#b29350'),
                  value: '5.5',
                  children: [
                    {
                      name: 'Green apple, peach, pineapple, baked fruit, poached fruit',
                      color: am4core.color('#b18124'),
                      value: '5.5',
                    },
                  ],
                },
              ],
            },
            {
              name: 'Floral',
              color: am4core.color('#aa7e5b'),
              value: '16.67',
              children: [
                {
                  name: 'Nature',
                  color: am4core.color('#a46a49'),
                  value: '5.5',
                  children: [
                    {
                      name: 'Cut grass, fragrant, wild flowers',
                      color: am4core.color('#944127'),
                      value: '5.5',
                    },
                  ],
                },
                {
                  name: 'Flowers',
                  color: am4core.color('#a46a49'),
                  value: '5.5',
                  children: [
                    {
                      name: 'Roses, carnations, lilies, hydrangea',
                      color: am4core.color('#944127'),
                      value: '5.5',
                    },
                  ],
                },
                {
                  name: 'Vegetal',
                  color: am4core.color('#a46a49'),
                  value: '5.5',
                  children: [
                    {
                      name: 'Ferch, bracken, mushroom, moss',
                      color: am4core.color('#944127'),
                      value: '5.5',
                    },
                  ],
                },
              ],
            },
            {
              name: 'Cereal',
              color: am4core.color('#8d6f53'),
              value: '16.67',
              children: [
                {
                  name: 'Malty',
                  color: am4core.color('#79553a'),
                  value: '5.5',
                  children: [
                    {
                      name: 'Breakfast cereal, horlicks, brewery',
                      color: am4core.color('#643b27'),
                      value: '5.5',
                    },
                  ],
                },
                {
                  name: 'Nutty',
                  color: am4core.color('#79553a'),
                  value: '5.5',
                  children: [
                    {
                      name: 'Hazelnut, walnut, almond, roased chestnut',
                      color: am4core.color('#643b27'),
                      value: '5.5',
                    },
                  ],
                },
                {
                  name: 'Sweet',
                  color: am4core.color('#79553a'),
                  value: '5.5',
                  children: [
                    {
                      name: 'Honey, demerara sugar, muscovado, chocolate',
                      color: am4core.color('#643b27'),
                      value: '5.5',
                    },
                  ],
                },
              ],
            },
            {
              name: 'Spicy',
              color: am4core.color('#ac7b5b'),
              value: '16.67',
              children: [
                {
                  name: 'Herbal',
                  color: am4core.color('#a96946'),
                  value: '5.5',
                  children: [
                    {
                      name: 'Rosemary, thyme, basil, lemon-grass, tarragon',
                      color: am4core.color('#963f2e'),
                      value: '5.5',
                    },
                  ],
                },
                {
                  name: 'Dried fruit',
                  color: am4core.color('#a96946'),
                  value: '5.5',
                  children: [
                    {
                      name: 'Banana, sultanas, currants, figs, apricot',
                      color: am4core.color('#963f2e'),
                      value: '5.5',
                    },
                  ],
                },
                {
                  name: 'Spices',
                  color: am4core.color('#a96946'),
                  value: '5.5',
                  children: [
                    {
                      name: 'Cinnamon, nutmeg,  clove, star anise',
                      color: am4core.color('#963f2e'),
                      value: '5.5',
                    },
                  ],
                },
              ],
            },
            {
              name: 'Peaty',
              color: am4core.color('#a78869'),
              value: '16.67',
              children: [
                {
                  name: 'Medicinal',
                  color: am4core.color('#a07855'),
                  value: '5.5',
                  children: [
                    {
                      name: 'Gauze dressing, iodine, throat sweet, tcp',
                      color: am4core.color('#90603c'),
                      value: '5.5',
                    },
                  ],
                },
                {
                  name: 'Industrial',
                  color: am4core.color('#a07855'),
                  value: '5.5',
                  children: [
                    {
                      name: 'Steam engine, soot, coal fire, coal shed',
                      color: am4core.color('#90603c'),
                      value: '5.5',
                    },
                  ],
                },
                {
                  name: 'Peat smoke',
                  color: am4core.color('#a07855'),
                  value: '5.5',
                  children: [
                    {
                      name: 'Oriental tea, bonfire, smoked fish, burring tar',
                      color: am4core.color('#90603c'),
                      value: '5.5',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];
      this.chart.dataFields.value = 'value';
      this.chart.dataFields.name = 'name';
      this.chart.dataFields.children = 'children';
      this.chart.dataFields.color = 'color';

      let radiusByLevel = [100, 35, 25, 23];

      for (let i = 0; i < 4; i++) {
        var level0SeriesTemplate = new am4plugins.SunburstSeries();
        this.chart.seriesTemplates.setKey(i.toString(), level0SeriesTemplate);
        level0SeriesTemplate.labels.template.fill = am4core.color('#000000');
        level0SeriesTemplate.labels.template.text = '{category}';
        level0SeriesTemplate.slices.template.tooltipText = '{category}';
        level0SeriesTemplate.labels.template.relativeRotation = NaN;
        level0SeriesTemplate.labels.template.radius = am4core.percent(radiusByLevel[i]);
        level0SeriesTemplate.labels.template.maxWidth = 90;
        level0SeriesTemplate.labels.template.wrap = true;
        level0SeriesTemplate.labels.template.fontSize = 13;
        level0SeriesTemplate.labels.template.textAlign = 'middle';
        level0SeriesTemplate.slices.template.fillOpacity = 0.65;
        level0SeriesTemplate.slices.template.states.getKey('hover').properties.scale = 1;
        level0SeriesTemplate.slices.template.states.getKey('hover').properties.fill = am4core.color('#cccccc');
        level0SeriesTemplate.slices.template.states.getKey('active').properties.shiftRadius = 0;
        level0SeriesTemplate.slices.template.cursorOverStyle = am4core.MouseCursorStyle.pointer;

        level0SeriesTemplate.slices.template.events.on(
          'hit',
          function (ev) {
            let selected: string = ev.target.dataItem.properties.category;
            if (selected == 'Flavours') return (this.keywords = []);
            keywords = selected.toLowerCase().split(',');
            let transpond: string[] = [];
            keywords.forEach((element) => {
              element = element.trim();

              transpond.push(element);
            });
            this.keywords = transpond;
          },
          this
        );
      }

      function string_to_slug(str: string, separator: string) {
        str = str.trim();
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        const from = 'åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;';
        const to = 'aaaaaaeeeeiiiioooouuuunc------';

        for (let i = 0, l = from.length; i < l; i++) {
          str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        return str
          .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
          .replace(/\s+/g, '-') // collapse whitespace and replace by -
          .replace(/-+/g, '-') // collapse dashes
          .replace(/^-+/, '') // trim - from start of text
          .replace(/-+$/, '') // trim - from end of text
          .replace(/-/g, separator);
      }
    });
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
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
