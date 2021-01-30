import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PracticeAreasRoutingModule } from './practice-areas-routing.module';
import { PracticeAreasComponent } from './practice-areas.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [PracticeAreasComponent],
  imports: [
    CommonModule,
    PracticeAreasRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PracticeAreasModule { }
