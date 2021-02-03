import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddPostsComponent } from './components/add-posts/add-posts.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path : '',
    component: AdminComponent,
    children: [
      {path: 'home', component: HomeComponent },
      {path: 'add-posts', component: AddPostsComponent},
      {path: '', pathMatch: 'full', redirectTo: 'home'},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
