import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AddPostsComponent } from './components/blog/add-posts/add-posts.component';
import { CategoryComponent } from './components/blog/category/category.component';
import { CommentsComponent } from './components/blog/comments/comments.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path : '',
    component: AdminComponent,
    children: [
      {path: 'home', component: HomeComponent },
      {path: 'add-posts', component: AddPostsComponent},
      {path: 'add-category', component: CategoryComponent},
      {path: 'comments', component: CommentsComponent},
      {path: 'users', component: UsersComponent},
      {path: 'edit-profile', component: EditProfileComponent},
      {path: '', pathMatch: 'full', redirectTo: 'home'},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
