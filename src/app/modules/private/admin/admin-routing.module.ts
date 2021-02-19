import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AddPostsComponent } from './components/blog/add-posts/add-posts.component';
import { CategoryComponent } from './components/blog/category/category.component';
import { CommentsComponent } from './components/blog/comments/comments.component';
import { EditProfileComponent } from './components/users/edit-profile/edit-profile.component';
import { HomeComponent } from './components/painel/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { ListPostsComponent } from './components/blog/list-posts/list-posts.component';
import { AuthGuardService } from '../login/auth/auth-guard.service';

const routes: Routes = [
  {
    path : '',
    component: AdminComponent,
    children: [
      {path: 'home', component: HomeComponent },
      {path: 'add-posts', component: AddPostsComponent},
      {path: 'list-posts', component: ListPostsComponent},
      {path: 'add-category', component: CategoryComponent},
      {path: 'comments', component: CommentsComponent},
      {path: 'users', component: UsersComponent},
      {path: 'edit-profile/:id', component: EditProfileComponent},
      {path: 'edit-theme', loadChildren: () => import('./components/edit-theme/edit-theme.module').then(m => m.EditThemeModule) },
      {path: '', pathMatch: 'full', redirectTo: 'home'},
    ],
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
