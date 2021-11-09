import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
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
}
