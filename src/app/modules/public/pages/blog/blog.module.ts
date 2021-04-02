import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { SharedModule } from '../shared/shared.module';
import { SingleBlogComponent } from './components/single-blog/single-blog.component';
import { AsideLateralComponent } from './components/aside-lateral/aside-lateral.component';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

registerLocaleData(localePt);

@NgModule({
  declarations: [BlogComponent, SingleBlogComponent, AsideLateralComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BlogModule { }
