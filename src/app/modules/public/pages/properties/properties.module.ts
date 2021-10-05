import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertiesComponent } from './properties.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [PropertiesComponent],
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PropertiesModule { }
