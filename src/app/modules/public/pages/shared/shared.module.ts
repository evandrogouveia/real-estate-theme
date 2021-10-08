import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryBannerPagesComponent } from './entry-banner-pages/entry-banner-pages.component';
import { ErrorInputComponent } from './error-input/error-input.component';
import { CardsPropertiesComponent } from './cards-properties/cards-properties.component';
import { LoadingComponent } from './loading/loading.component';
import { NgxLoadingModule,  ngxLoadingAnimationTypes } from 'ngx-loading';




@NgModule({
  declarations: [
    EntryBannerPagesComponent,
    ErrorInputComponent,
    CardsPropertiesComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes
    })
  ],
  exports: [
    EntryBannerPagesComponent,
    ErrorInputComponent,
    CardsPropertiesComponent,
    LoadingComponent,
    NgxLoadingModule
  ]
})
export class SharedModule { }
