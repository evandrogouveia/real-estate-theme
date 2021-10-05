import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryBannerPagesComponent } from './entry-banner-pages/entry-banner-pages.component';
import { ErrorInputComponent } from './error-input/error-input.component';
import { CardsComponentComponent } from './cards-component/cards-component.component';



@NgModule({
  declarations: [ 
    EntryBannerPagesComponent, ErrorInputComponent, CardsComponentComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EntryBannerPagesComponent,
    ErrorInputComponent
  ]
})
export class SharedModule { }
