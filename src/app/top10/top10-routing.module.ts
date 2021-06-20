import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { Top10Plugin } from './plugin/top10-plugin.component';
import { Top10Page } from './page/top10-page.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'plugin', component: Top10Plugin, data: { title: marker('Top 10') } },
    { path: 'top10', component: Top10Page, data: { title: marker('Top 10') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class Top10RoutingModule {}
