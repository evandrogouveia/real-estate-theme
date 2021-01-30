import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryBannerPagesComponent } from './entry-banner-pages/entry-banner-pages.component';



@NgModule({
  declarations: [ EntryBannerPagesComponent,],
  imports: [
    CommonModule
  ],
  exports: [
    EntryBannerPagesComponent
  ]
})
export class SharedModule { }
