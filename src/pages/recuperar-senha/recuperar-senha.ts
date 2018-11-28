import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';


@IonicPage()
@Component({
  selector: 'page-recuperar-senha',
  templateUrl: 'recuperar-senha.html',
})
export class RecuperarSenhaPage {

  emailDigitado: string;
  email: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public fire: AngularFireAuth

  ) {
    this.emailDigitado = "";
  }

  recoveryPassword() {
    if (this.emailDigitado != "") {
      let toast = this.toastCtrl.create({ duration: 2000, position: 'bottom' });
      this.fire.auth.sendPasswordResetEmail(this.emailDigitado).then(() => {
        toast.setMessage('Solicitação enviada para seu Email.');
        toast.present();
        this.navCtrl.pop();
      }).catch((error: any) => {
        if (error.code == 'auth/invalid-email.') {
          toast.setMessage('Email invalido');
        } else if (error.code == 'auth/user-not-found') {
          toast.setMessage('Usuario não encontrado.');
        }
        toast.present();
      });
    }
  }
}

