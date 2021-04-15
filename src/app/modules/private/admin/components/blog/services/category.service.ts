import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesCollection: AngularFirestoreCollection<Category> = this.afs.collection('categories', ref => {
    return ref.orderBy('name', 'asc');
  })

  constructor(private afs:AngularFirestore) { }

  //LISTAR CATEGORIAS
  getCategory(){
    return this.categoriesCollection.valueChanges();
  }

  //LISTAR CATEGORIA POR ID
  getCategoryDetail(cId: string): AngularFirestoreDocument<Category>{
    return this.categoriesCollection.doc(cId)
  }

  //ADICIONAR CATEGORIA
  addCategory(c: Category){
    c.id = this.afs.createId();
    return this.categoriesCollection.doc(c.id).set(c);
  }

  //ATUALIZAR CATEGORIA
  updateCategory(c: Category){
    return this.categoriesCollection.doc(c.id).set(c);
  }

  //DELETAR CATEGORIA
  deleteCategory(c: Category){
    this.categoriesCollection.doc(c.id).delete();
  }

  searchByName(name: string): Observable<Category[]>{
    return this.afs.collection<Category>('categories',
    ref => ref.orderBy('name').startAt(name).endAt(name + '\uf8ff')).valueChanges();
  }
}
