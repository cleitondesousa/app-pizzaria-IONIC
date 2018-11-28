import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { CartComprasProvider } from '../../providers/cart-compras/cart-compras';
import { NumeroPedidoPage } from '../numero-pedido/numero-pedido';
import { FirebaseProvider } from '../../providers/firebase/firebase';


@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {

  pizzas = [];
  refris = [];
  carrinho=[];
  shownGroup = null;
  cupomDesconto;
  valorDesconto = 0;
  endereco;
  valorEntrega = 5.00;
  subtotal = 0;
  TotalGeral = 0;
  contemItens:boolean = false;
  usuario;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartProvider: CartComprasProvider,
    public events: Events,
    private fire : FirebaseProvider
  ) {
    this.usuario = fire.getUsuario();
    this.events.subscribe('carrinho', (car) => {
      this.pizzas = [];
      this.refris = [];
      this.contemItens = false;
      car.forEach(element => {
        if (element.produto == "pizza") {
          this.pizzas.push(element);
          this.contemItens = true;
        }else{
          this.refris.push(element);
          this.contemItens = true;
        }
      });
      this.getTotal();
    });

    this.getItensCarrinho();
    this.getTotal();
  }

  getItensCarrinho(){
    let tmp = [];
    this.cartProvider.getCarrinho(this.usuario.uid).subscribe(actions => {
      actions.forEach(action => {
        tmp.push({ key: action.key, ...action.payload.val() })
      })
      this.carrinho = tmp;
      this.contemItens = false;
      if (this.carrinho != null) {
        this.events.publish('carrinho', this.carrinho);
      }
    });
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };

  isGroupShown(group) {
    return this.shownGroup === group;
  };

  getTotal() {
    this.TotalGeral = 0;
    this.subtotal = 0;
    this.pizzas.forEach(element => {
      this.subtotal += parseFloat(element.valor);
    });
    this.refris.forEach(element => {
      this.subtotal += parseFloat(element.valor);
    });

    this.TotalGeral = this.subtotal + this.valorEntrega + this.valorDesconto;
  }

  excluirItem(key){
    this.cartProvider.deletarItemCarrinho(this.usuario.uid, key);
    this.getItensCarrinho();
  }

  finalizarPedido() {
    this.cartProvider.FinalizarCompra(this.usuario.uid);
    this.navCtrl.setRoot(NumeroPedidoPage.name);
  }
}
