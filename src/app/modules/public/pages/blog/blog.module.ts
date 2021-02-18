import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { SharedModule } from '../shared/shared.module';
import { SingleBlogComponent } from './components/single-blog/single-blog.component';
import { AsideLateralComponent } from './components/aside-lateral/aside-lateral.component';


@NgModule({
  declarations: [BlogComponent, SingleBlogComponent, AsideLateralComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BlogModule { }
