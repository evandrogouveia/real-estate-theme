import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryBannerPagesComponent } from './entry-banner-pages/entry-banner-pages.component';
import { ErrorInputComponent } from './error-input/error-input.component';
import { CardsPropertiesComponent } from './cards-properties/cards-properties.component';




@NgModule({
  declarations: [ 
    EntryBannerPagesComponent, ErrorInputComponent, CardsPropertiesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EntryBannerPagesComponent,
    ErrorInputComponent,
    CardsPropertiesComponent
  ]
})
export class SharedModule { }
