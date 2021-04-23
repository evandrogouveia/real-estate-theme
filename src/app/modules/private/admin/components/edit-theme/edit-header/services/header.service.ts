import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Topbar } from '../models/topbar.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private topbarCollection: AngularFirestoreCollection<Topbar> = this.afs.collection('topbar', ref => {
    return ref.orderBy('email', 'asc');
  })

  constructor(private afs:AngularFirestore) { }

  //GET TOPBAR
  getTopbar(){
    return this.topbarCollection.valueChanges();
  }

   //GET TOPBAR ID
   getTopbarDetail(tId: string): AngularFirestoreDocument<Topbar>{
    return this.topbarCollection.doc(tId)
  }

  //ADICIONAR TOPBAR
  addTopbar(t: Topbar){
    t.id = this.afs.createId();
    return this.topbarCollection.doc(t.id).set(t);
  }

  //UPDATE TOPBAR
  updateTopbar(t: Topbar){
    return this.topbarCollection.doc(t.id).set(t);
  }
}
