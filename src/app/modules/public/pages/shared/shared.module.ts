import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryBannerPagesComponent } from './entry-banner-pages/entry-banner-pages.component';
import { ErrorInputComponent } from './error-input/error-input.component';



@NgModule({
  declarations: [ 
    EntryBannerPagesComponent, ErrorInputComponent,
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
