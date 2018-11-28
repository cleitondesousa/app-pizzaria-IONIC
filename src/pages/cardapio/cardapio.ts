import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutosProvider } from '../../providers/produtos/produtos';
import { CardapioDetalhesPage } from '../cardapio-detalhes/cardapio-detalhes';
import { CarrinhoPage } from '../carrinho/carrinho';
import { CartComprasProvider } from '../../providers/cart-compras/cart-compras';


@IonicPage()
@Component({
  selector: 'page-cardapio',
  templateUrl: 'cardapio.html',
})
export class CardapioPage {
  
  pizzas: any[];
  adicionais=[];
  ValorTAMPizzas=[];
  itens=0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private prov : ProdutosProvider,
    private produtosProv: ProdutosProvider
  ) {
    let tmp = [];
    this.prov.getPizzas().subscribe(actions => {
      actions.forEach(action => {
        tmp.push({ key: action.key, ...action.payload.val() })
      })
      this.pizzas = tmp;
    });

    let tmp2 = [];
    this.prov.getAdicionais().subscribe(actions => {
      actions.forEach(action => {
        tmp2.push({ key: action.key, ...action.payload.val() })
      })
      this.adicionais = tmp2;
    });

    let tmp3 = [];
    this.produtosProv.getPrecosTamPizzas().subscribe(actions => {
      actions.forEach(action => {
        tmp3.push({ key: action.key, ...action.payload.val() })
      })
      this.ValorTAMPizzas = tmp3;
    });

  }

  escolheuPizza(pizza){
    this.navCtrl.push(CardapioDetalhesPage.name, {"pizza" : pizza , "adicionais" : this.adicionais, "ValorTAMPizzas" : this.ValorTAMPizzas});
  }
  goToCarrinho(){
    this.navCtrl.setRoot(CarrinhoPage.name);
  }
}
