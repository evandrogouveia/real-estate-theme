import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Propriedades } from 'src/app/modules/private/admin/components/properties/models/propriedades.model';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  private propertiesCollection: AngularFirestoreCollection<Propriedades> = this.afs.collection('properties');

  constructor(private afs:AngularFirestore) { }

  //LISTAR PROPRIEDADES
  getProperties(){
    return this.propertiesCollection.valueChanges();
  }

  //LISTAR PROPRIEDADE POR ID
  getPropertyDetail(propertyId: string): AngularFirestoreDocument<Propriedades>{
    return this.propertiesCollection.doc(propertyId);
  }

}
