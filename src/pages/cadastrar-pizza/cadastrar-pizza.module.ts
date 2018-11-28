import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastrarPizzaPage } from './cadastrar-pizza';

@NgModule({
  declarations: [
    CadastrarPizzaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastrarPizzaPage),
  ],
  exports: [
    CadastrarPizzaPage
  ]
})
export class CadastrarPizzaPageModule {}
