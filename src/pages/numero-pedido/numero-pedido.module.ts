import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NumeroPedidoPage } from './numero-pedido';

@NgModule({
  declarations: [
    NumeroPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(NumeroPedidoPage),
  ],
  exports: [
    NumeroPedidoPage
  ]
})
export class NumeroPedidoPageModule { }
