import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Users } from '../../pages/login/users';
import { FirebaseProvider } from '../firebase/firebase';


@Injectable()
export class CartComprasProvider {

  PATH: string = "/banco";

  constructor(
    private db: AngularFireDatabase,
    
  ) {
  }

  public inserir(uid, produto) {
    if (uid != null) {
      this.db.list(this.PATH + "/carrinho/" + uid).push(produto);
    }
  }

  public getCarrinho(uid){
    return this.db.list(this.PATH + "/carrinho/" + uid).snapshotChanges();
  }

  deletarItemCarrinho(uid, key){
    this.db.list(this.PATH + "/carrinho/" + uid + "/" + key).remove();
  }

  FinalizarCompra(uid){
    this.db.list(this.PATH + "/carrinho/" + uid).remove();
  }
}



export class Pizza {
  produto:string;
  name: string;
  url: string;
  adicionais;
  valor: number;
  tamanho: string;
}

export class Refri {
  produto:string;
  refris;
  url: string;
  valor: number;
}