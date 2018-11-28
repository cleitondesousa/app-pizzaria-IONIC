import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { ProdutosProvider } from '../../providers/produtos/produtos';
import { Refri, CartComprasProvider } from '../../providers/cart-compras/cart-compras';
import { CarrinhoPage } from '../carrinho/carrinho';
import { FirebaseProvider } from '../../providers/firebase/firebase';


@IonicPage()
@Component({
  selector: 'page-refrigerantes',
  templateUrl: 'refrigerantes.html',
})
export class RefrigerantesPage {
  
  refri;
  arrayRefris = [];
  refrigerantes = [];
  refr = new Refri();
  ValorTotal=0;
  StatusValorRefri=0;
  itens=0;
  usuario;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private produtosProv: ProdutosProvider,
    private cartProvider: CartComprasProvider,
    public events: Events,
    private fire : FirebaseProvider
  ) {
    this.usuario = fire.getUsuario();
    this.events.subscribe('arrayRefris', () => {
      this.createArrayAdicionais();
    });


    let tmp = [];
    this.produtosProv.getRefrigerantes().subscribe(actions => {
      actions.forEach(action => {
        tmp.push({ key: action.key, ...action.payload.val() })
      })
      this.refrigerantes = tmp;
      if (this.refrigerantes != null) {
        this.events.publish('arrayRefris');
      }
    });
    
  }

  createArrayAdicionais() {
    for (let i = 0; i < this.refrigerantes.length; i++) {
      let checked: boolean = false;
      this.arrayRefris.push({ nome: this.refrigerantes[i].nome, valor: this.refrigerantes[i].valor, ischecked: checked , status:0 });
    } 
  }
  onRefrisSelected(item){
    if (item.status == 0) {
      item.status = 1;
      this.ValorTotal += parseFloat(item.valor);
      this.StatusValorRefri += parseFloat(item.valor);
    }else {
      item.status = 0;
      this.ValorTotal -= parseFloat(item.valor);
      this.StatusValorRefri -= parseFloat(item.valor);
    }
  }

  adicionarCarrinho(){
    let toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});
    if (this.StatusValorRefri > 0) {
      this.refr.produto = "refri"
      this.refr.refris = this.getRefrisParaCart();
      this.refr.valor = this.ValorTotal;
      this.cartProvider.inserir(this.usuario.uid, this.refr);
      this.navCtrl.setRoot(CarrinhoPage.name);
    }
    else{
      toast.setMessage('Nenhum Refrigerante Selecionado');
    }
    
    toast.present();    
  }



  getRefrisParaCart(){
    let vetor=[];
    for (let i = 0; i < this.arrayRefris.length; i++) {
      if (this.arrayRefris[i].ischecked) {
        vetor.push(this.arrayRefris[i]);
      }
    }
    return vetor;
  }

  goToCarrinho(){
    this.navCtrl.setRoot(CarrinhoPage.name);
  }
}
