import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private addpostCollection: AngularFirestoreCollection<Post> = this.afs.collection('posts', ref => {
    return ref.orderBy('titlePost', 'asc');
  })

  constructor(private afs:AngularFirestore) { }

  addPost(p: Post){
    p.id = this.afs.createId();
    return this.addpostCollection.doc(p.id).set(p);
  }


}
