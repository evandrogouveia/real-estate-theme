import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Post } from 'src/app/modules/private/admin/components/blog/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private postsCollection: AngularFirestoreCollection<Post> = this.afs.collection('posts', ref => {
    return ref.orderBy('titlePost', 'asc');
  });

  constructor(private afs:AngularFirestore) { }

  //LISTAR POSTS
  getPosts(){
    return this.postsCollection.valueChanges();
  }
}
