import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Property } from '../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private propertiesCollection: AngularFirestoreCollection<Property> = this.afs.collection('properties', ref => {
    return ref.orderBy('titleProperty', 'asc');
  });

  constructor(private afs:AngularFirestore) { }

   //LISTAR PROPERTY
   getProperties(){
    return this.propertiesCollection.valueChanges();
  }

  //LISTAR PROPERTY POR ID
  getPropertyDetail(propertyId: string): AngularFirestoreDocument<Property>{
    return this.propertiesCollection.doc(propertyId)
  }

  //ADICIONAR PROPERTY
  addProperty(p: Property){
    p.id = this.afs.createId();
    return this.propertiesCollection.doc(p.id).set(Object.assign({}, p));
  }

  //ATUALIZAR PROPERTY
  updateProperty(p: Property){
    return this.propertiesCollection.doc(p.id).set(p);
  }

  //DELETAR PROPERTY
  deleteProperty(p: Property){
    this.propertiesCollection.doc(p.id).delete();
  }
}
