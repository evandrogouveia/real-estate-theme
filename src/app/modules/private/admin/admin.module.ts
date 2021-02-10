import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/painel/home/home.component';
import { HeaderComponent } from './components/painel/header/header.component';
import { SidebarComponent } from './components/painel/sidebar/sidebar.component';
import { NgxBootstrapModule } from 'src/app/ngx-bootstrap.module';
import { AddPostsComponent } from './components/blog/add-posts/add-posts.component';
import { CategoryComponent } from './components/blog/category/category.component';
import { CommentsComponent } from './components/blog/comments/comments.component';
import { UsersComponent } from './components/users/users.component';
import { EditProfileComponent } from './components/users/edit-profile/edit-profile.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';


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
    EditProfileComponent, 
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxBootstrapModule,
    AngularEditorModule,
    HttpClientModule
  ]
})
export class AdminModule { }
