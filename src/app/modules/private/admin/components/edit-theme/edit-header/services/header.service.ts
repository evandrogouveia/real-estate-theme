import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Navbar } from '../models/navbar.model';
import { Topbar } from '../models/topbar.model';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private topbarCollection: AngularFirestoreCollection<Topbar> = this.afs.collection('topbar', ref => {
    return ref.orderBy('email', 'asc');
  })

  private navbarCollection: AngularFirestoreCollection<Navbar> = this.afs.collection('navbar', ref => {
    return ref.orderBy('id', 'asc');
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



  //GET NAVBAR
  getNavbar(){
    return this.navbarCollection.valueChanges();
  }

  //GET NAVBAR ID
  getNavbarDetail(nId: string): AngularFirestoreDocument<Navbar>{
    return this.navbarCollection.doc(nId)
  }

  //ADICIONAR NAVBAR
  addNavbar(n: Navbar){
    n.id = this.afs.createId();
    return this.navbarCollection.doc(n.id).set(n);
  }

  //UPDATE NAVBAR
  updateNavbar(n: Navbar){
    return this.navbarCollection.doc(n.id).set(n);
  }


  
}
