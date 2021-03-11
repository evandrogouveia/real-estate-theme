import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
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

  //ADICIONAR CATEGORIA
  addCategory(c: Category){
    c.id = this.afs.createId();
    return this.categoriesCollection.doc(c.id).set(c);
  }

  //DELETAR CATEGORIA
  deleteCategory(c: Category){
    this.categoriesCollection.doc(c.id).delete();
  }
}
