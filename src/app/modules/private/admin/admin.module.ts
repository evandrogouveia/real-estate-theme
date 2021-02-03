import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgxBootstrapModule } from 'src/app/ngx-bootstrap.module';
import { AddPostsComponent } from './components/add-posts/add-posts.component';


@NgModule({
  declarations: [AdminComponent, HomeComponent, HeaderComponent, SidebarComponent, AddPostsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxBootstrapModule,
  ]
})
export class AdminModule { }
