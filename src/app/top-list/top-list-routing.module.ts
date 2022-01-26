import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { TopListPlugin } from './plugin/top-list-plugin.component';
import { TopListPage } from './page/top-list-page.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'plugin', component: TopListPlugin, data: { title: marker('Top List') } },
    { path: 'top10', component: TopListPage, data: { title: marker('Top List') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class TopListRoutingModule {}
