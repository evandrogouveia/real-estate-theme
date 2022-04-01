import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Property } from 'src/app/modules/private/admin/components/properties/models/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  private propertiesCollection: AngularFirestoreCollection<Property> = this.afs.collection('properties');

  constructor(private afs:AngularFirestore) { }

  //LISTAR PROPRIEDADES
  getProperties(){
    return this.propertiesCollection.valueChanges();
  }

  //LISTAR PROPRIEDADE POR ID
  getPropertyDetail(propertyId: string): AngularFirestoreDocument<Property>{
    return this.propertiesCollection.doc(propertyId);
  }

}
