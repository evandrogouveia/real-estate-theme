import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { PracticeAreasComponent } from './pages/practice-areas/practice-areas.component';
import { EntryBannerPagesComponent } from './pages/entry-banner-pages/entry-banner-pages.component';



@NgModule({
  declarations: [PublicComponent, HeaderComponent, FooterComponent, PracticeAreasComponent, EntryBannerPagesComponent],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
