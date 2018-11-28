
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable()
export class ProdutosProvider {

  PATH: string = "/banco";

  constructor(private db: AngularFireDatabase) {
    
  }

  setPizza(pizza){
    this.db.list(this.PATH + "/pizzas").push(pizza);
  }

  getPizzas(){
    return this.db.list(this.PATH + "/pizzas").snapshotChanges();
  }

  setPrecosTamPizzas(preco){
    this.db.list(this.PATH + "/precosTAMpizza").push(preco);
  }
  getPrecosTamPizzas(){
    return this.db.list(this.PATH + "/precosTAMpizza").snapshotChanges();
  }
  

  setAdicionais(adicional){
    this.db.list(this.PATH + "/adicionais").push(adicional);
  }
  getAdicionais(){
    return this.db.list(this.PATH + "/adicionais").snapshotChanges()
  } 

  setRefrigerantes(adicional){
    this.db.list(this.PATH + "/refrigerantes").push(adicional);
  }
  getRefrigerantes(){
    return this.db.list(this.PATH + "/refrigerantes").snapshotChanges();
  }


  
}
