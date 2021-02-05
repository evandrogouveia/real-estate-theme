import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgxBootstrapModule } from 'src/app/ngx-bootstrap.module';
import { AddPostsComponent } from './components/blog/add-posts/add-posts.component';
import { CategoryComponent } from './components/blog/category/category.component';
import { CommentsComponent } from './components/blog/comments/comments.component';
import { UsersComponent } from './components/users/users.component';
import { EditProfileComponent } from './components/users/edit-profile/edit-profile.component';
import { EditHeaderComponent } from './components/edit-theme/edit-header/edit-header.component';
import { EditFooterComponent } from './components/edit-theme/edit-footer/edit-footer.component';


@NgModule({
  declarations: [
    AdminComponent, 
    HomeComponent, 
    HeaderComponent, 
    SidebarComponent, 
    AddPostsComponent, 
    CategoryComponent, 
    CommentsComponent, 
    UsersComponent, 
    EditProfileComponent, EditHeaderComponent, EditFooterComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxBootstrapModule,
  ]
})
export class AdminModule { }