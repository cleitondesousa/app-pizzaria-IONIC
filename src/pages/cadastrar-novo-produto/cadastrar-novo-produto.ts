import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastrarPizzaPage } from '../cadastrar-pizza/cadastrar-pizza';



@IonicPage()
@Component({
  selector: 'page-cadastrar-novo-produto',
  templateUrl: 'cadastrar-novo-produto.html',
})
export class CadastrarNovoProdutoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToCadastrarPizza(){
    this.navCtrl.push(CadastrarPizzaPage.name);
  }
}
