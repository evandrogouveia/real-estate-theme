import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsCollection: AngularFirestoreCollection<Post> = this.afs.collection('posts', ref => {
    return ref.orderBy('titlePost', 'asc');
  });

  constructor(private afs:AngularFirestore) { }

  //LISTAR POSTS
  getPosts(){
    return this.postsCollection.valueChanges();
  }

  //LISTAR POST POR ID
  getPostDetail(postId: string): AngularFirestoreDocument<Post>{
    return this.postsCollection.doc(postId)
  }

  //ADICIONAR POSTS
  addPost(p: Post){
    p.id = this.afs.createId();
    return this.postsCollection.doc(p.id).set(p);
  }

  //ATUALIZAR POSTS
  updatePost(p: Post){
    return this.postsCollection.doc(p.id).set(p);
  }

  //DELETAR POST
  deletePost(p: Post){
    this.postsCollection.doc(p.id).delete();
  }


}
