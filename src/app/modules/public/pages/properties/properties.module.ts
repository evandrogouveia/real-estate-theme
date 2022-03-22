import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertiesComponent } from './properties.component';
import { SharedModule } from '../shared/shared.module';
import { SinglePropertyComponent } from './components/single-property/single-property.component';


@NgModule({
  declarations: [PropertiesComponent, SinglePropertyComponent],
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PropertiesModule { }
