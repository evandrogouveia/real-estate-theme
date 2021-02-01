import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { SingleBlogComponent } from './components/single-blog/single-blog.component';

const routes: Routes = [
  {
    path : '',
    component: BlogComponent
  },
  {
    path : 'single-blog',
    component: SingleBlogComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
