import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastrarNovoProdutoPage } from './cadastrar-novo-produto';

@NgModule({
  declarations: [
    CadastrarNovoProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastrarNovoProdutoPage),
  ],
  exports: [
    CadastrarNovoProdutoPage
  ]
})
export class CadastrarNovoProdutoPageModule {}
