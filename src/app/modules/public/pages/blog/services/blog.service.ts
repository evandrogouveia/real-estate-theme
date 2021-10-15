import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { delay, timeout } from 'rxjs/operators';
import { Category } from 'src/app/modules/private/admin/components/blog/models/category.model';
import { Post } from 'src/app/modules/private/admin/components/blog/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private postsCollection: AngularFirestoreCollection<Post> = this.afs.collection('posts', ref => {
    return ref.orderBy('titlePost', 'desc');
  });
  private categoriesCollection: AngularFirestoreCollection<Category> = this.afs.collection('categories', ref => {
    return ref.orderBy('name', 'asc');
  });

  constructor(private afs:AngularFirestore) { }

  //LISTAR POSTS
  getPosts(){
    return this.postsCollection.valueChanges();
  }

  //ADICIONAR COMENTÁRIOS
  addComments(p: Post){
    return this.postsCollection.doc(p.id).set(p);
  }

  //ATUALIZAR COMENTÁRIOS
  updateComments(p: Post){
    return this.postsCollection.doc(p.id).update(p);
  }

  //LISTAR CATEGORIAS
  getCategory(){
    return this.categoriesCollection.valueChanges();
  }

  searchByName(name: string): Observable<Post[]>{
    return this.afs.collection<Post>('posts',
    ref => ref.orderBy('titlePost').startAt(name).endAt(name + '\uf8ff')).valueChanges();
  }

  searchByCategory(name: string): Observable<Post[]>{
    return this.afs.collection<Post>('posts',
    ref => ref.where('categories', 'array-contains-any', [name])).valueChanges();
  }
}
