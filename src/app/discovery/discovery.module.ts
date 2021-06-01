import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared';
import { DiscoveryRoutingModule } from './discovery-routing.module';
import { ByTasteComponent } from './byTaste/byTaste.component';
import { ByCountryComponent } from './byCountry/byCountry.component';
import { FilterByTastePipe } from '../pipes/filterByTaste.pipe';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, DiscoveryRoutingModule, FormsModule],
  declarations: [ByTasteComponent, ByCountryComponent, FilterByTastePipe],
})
export class DiscoveryModule {}
