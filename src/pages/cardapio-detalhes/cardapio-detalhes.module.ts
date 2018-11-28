import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CardapioDetalhesPage } from './cardapio-detalhes';

@NgModule({
  declarations: [
    CardapioDetalhesPage,
  ],
  imports: [
    IonicPageModule.forChild(CardapioDetalhesPage),
  ],
  exports: [
    CardapioDetalhesPage
  ]
})
export class CardapioDetalhesPageModule {}
