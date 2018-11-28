import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AreaAdministradorPage } from './area-administrador';

@NgModule({
  declarations: [
    AreaAdministradorPage,
  ],
  imports: [
    IonicPageModule.forChild(AreaAdministradorPage),
  ],
  exports: [
    AreaAdministradorPage
  ]
})
export class AreaAdministradorPageModule {}
