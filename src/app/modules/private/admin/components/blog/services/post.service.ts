import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsCollection: AngularFirestoreCollection<Post> = this.afs.collection('posts', ref => {
    return ref.orderBy('titlePost', 'asc');
  })

  constructor(private afs:AngularFirestore) { }

  //LISTAR POSTS
  getPosts(){
    return this.postsCollection.valueChanges();
  }

  //ADICIONAR POSTS
  addPost(p: Post){
    p.id = this.afs.createId();
    return this.postsCollection.doc(p.id).set(p);
  }

  //DELETAR POST
  deletePost(p: Post){
    this.postsCollection.doc(p.id).delete();
  }


}
