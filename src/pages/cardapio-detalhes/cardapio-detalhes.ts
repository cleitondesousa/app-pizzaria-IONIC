import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProdutosProvider } from '../../providers/produtos/produtos';
import { CartComprasProvider, Pizza } from '../../providers/cart-compras/cart-compras';
import { CarrinhoPage } from '../carrinho/carrinho';
import { observable } from 'rxjs';
import { FirebaseProvider } from '../../providers/firebase/firebase';


@IonicPage()
@Component({
  selector: 'page-cardapio-detalhes',
  templateUrl: 'cardapio-detalhes.html',
})
export class CardapioDetalhesPage {

  pizza;
  adicionais=[] ;
  arrayAdicionais = [];
  refrigerantes;
  piz = new Pizza();
  TAM=4;
  ValorTotal=0;
  ValorTAMPizzas=[];
  StatusValorTAMPizza=0;
  itens=0;

  usuario;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private produtosProv: ProdutosProvider,
    private cartProvider: CartComprasProvider,
    private fire : FirebaseProvider
  ) {
    this.pizza = this.navParams.get("pizza");
    this.adicionais = this.navParams.get("adicionais");
    this.ValorTAMPizzas = this.navParams.get("ValorTAMPizzas");
    this.usuario = fire.getUsuario();

    this.createArrayAdicionais();
  }

  createArrayAdicionais() {
    for (let i = 0; i < this.adicionais.length; i++) {
      let checked: boolean = false;
      this.arrayAdicionais.push({ nome: this.adicionais[i].nome, valor: this.adicionais[i].valor, ischecked: checked , status:0 });
    } 
  }

  onTamSelected(){
    if (this.StatusValorTAMPizza == 0) {
      this.StatusValorTAMPizza = parseFloat(this.ValorTAMPizzas[this.TAM].valor);
      this.ValorTotal += parseFloat(this.ValorTAMPizzas[this.TAM].valor);
    }
    else{
      this.ValorTotal -= this.StatusValorTAMPizza;
      this.ValorTotal += parseFloat(this.ValorTAMPizzas[this.TAM].valor);
      this.StatusValorTAMPizza = parseFloat(this.ValorTAMPizzas[this.TAM].valor);
    }    
  }

  onAdicionaisSelected(item){

    if (item.status == 0) {
      item.status = 1;
      this.ValorTotal += parseFloat(item.valor);
      
    }else {
      this.ValorTotal -= parseFloat(item.valor);
      item.status = 0; 
    }
  }

  adicionarCarrinho(){
    let toast = this.toastCtrl.create({duration: 3000, position: 'bottom'});
    if (this.TAM < 4) {
      this.piz.produto = "pizza"
      this.piz.name = this.pizza.nome;
      this.piz.valor = this.ValorTotal;
      switch (this.TAM.toString()) {
        case "0":
            this.piz.tamanho = "Pequena";
          break;
          case "1":
            this.piz.tamanho = "Média";
          break;
          case "2":
            this.piz.tamanho = "Grande";
          break;
      }
      this.piz.adicionais = this.getAdicionaisParaCart();
      this.cartProvider.inserir(this.usuario.uid, this.piz);
      this.navCtrl.pop();
    }
    else{
      toast.setMessage('Escolha o Tamanho da Pizza');
    }
    
    toast.present();    
  }


  getAdicionaisParaCart(){
    let vetor=[];
    for (let i = 0; i < this.arrayAdicionais.length; i++) {
      if (this.arrayAdicionais[i].ischecked) {
        vetor.push(this.arrayAdicionais[i]);
      }
    }
    return vetor;
  }

  goToCarrinho(){
    this.navCtrl.setRoot(CarrinhoPage.name);
  }
}
