import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastrarRefrigerantePage } from './cadastrar-refrigerante';

@NgModule({
  declarations: [
    CadastrarRefrigerantePage,
  ],
  imports: [
    IonicPageModule.forChild(CadastrarRefrigerantePage),
  ],
  exports: [
    CadastrarRefrigerantePage
  ]
})
export class CadastrarRefrigerantePageModule {}
