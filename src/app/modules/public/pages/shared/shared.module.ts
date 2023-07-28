import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryBannerPagesComponent } from './entry-banner-pages/entry-banner-pages.component';
import { ErrorInputComponent } from './error-input/error-input.component';
import { CardsPropertiesComponent } from './cards-properties/cards-properties.component';
import { LoadingComponent } from './loading/loading.component';
import { NgxLoadingModule,  ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxBootstrapModule } from 'src/app/ngx-bootstrap.module';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';




@NgModule({
  declarations: [
    EntryBannerPagesComponent,
    ErrorInputComponent,
    CardsPropertiesComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    NgxBootstrapModule,
    FormsModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes
    }),
    NgxMaskModule.forRoot()
  ],
  exports: [
    EntryBannerPagesComponent,
    ErrorInputComponent,
    CardsPropertiesComponent,
    LoadingComponent,
    NgxSkeletonLoaderModule,
    NgxLoadingModule,
    NgxBootstrapModule,
    NgxMaskModule
  ]
})
export class SharedModule { }
