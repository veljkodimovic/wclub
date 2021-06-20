import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { ByTasteComponent } from './byTaste/byTaste.component';
import { ByCountryComponent } from './byCountry/byCountry.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    //{ path: '**', redirectTo: 'discovery/bytaste', pathMatch: 'full' },
    { path: '', redirectTo: 'discovery/bytaste', pathMatch: 'full' },
    { path: 'discovery/bytaste', component: ByTasteComponent, data: { title: marker('By Taste') } },
    { path: 'discovery/bycountry', component: ByCountryComponent, data: { title: marker('By Country') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class DiscoveryRoutingModule {}
