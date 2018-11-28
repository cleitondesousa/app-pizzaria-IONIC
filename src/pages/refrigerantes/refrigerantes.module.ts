import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RefrigerantesPage } from './refrigerantes';

@NgModule({
  declarations: [
    RefrigerantesPage,
  ],
  imports: [
    IonicPageModule.forChild(RefrigerantesPage),
  ],
  exports: [
    RefrigerantesPage
  ]
})
export class RefrigerantesPageModule {}
