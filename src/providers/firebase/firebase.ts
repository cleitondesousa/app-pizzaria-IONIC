import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class FirebaseProvider {

  constructor(
    private db: AngularFireDatabase,
    private ofAuth: AngularFireAuth
    ) {
    
  }

  adicionarUsuario(usuario) {
    this.db.object('usuario/' + usuario.uid).set(usuario);
  }

  getUsuario() {
    return this.ofAuth.auth.currentUser;
  }


}
