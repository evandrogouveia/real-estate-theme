import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Category } from 'src/app/modules/private/admin/components/blog/models/category.model';
import { Post } from 'src/app/modules/private/admin/components/blog/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private postsCollection: AngularFirestoreCollection<Post> = this.afs.collection('posts', ref => {
    return ref.orderBy('titlePost', 'asc');
  });
  private categoriesCollection: AngularFirestoreCollection<Category> = this.afs.collection('categories', ref => {
    return ref.orderBy('name', 'asc');
  });

  constructor(private afs:AngularFirestore) { }

  //LISTAR POSTS
  getPosts(){
    return this.postsCollection.valueChanges();
  }

  //LISTAR CATEGORIAS
  getCategory(){
    return this.categoriesCollection.valueChanges();
  }
}
