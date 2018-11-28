import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../login/login';
import { app } from 'firebase';



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email: string;
  fotoPerfil: boolean = false;
  facebook = {
    nome: '',
    fotoURL: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fire: AngularFireAuth,
    public toastCtrl: ToastController
  ) {
    this.email = fire.auth.currentUser.email;
    this.facebook.nome = fire.auth.currentUser.displayName;
    this.facebook.fotoURL = fire.auth.currentUser.photoURL;

    if (this.facebook.fotoURL == null) {
      this.fotoPerfil = false;
    } else {
      this.fotoPerfil = true;
    }
  }



  logout() {
    let toast = this.toastCtrl.create({ duration: 2000, position: 'bottom' });
    this.fire.auth.signOut().then(() => {
      this.navCtrl.setRoot(LoginPage.name);
      toast.setMessage('Deslogado com Sucesso.');
      toast.present();

    }).catch(() => {

    });

  }
}
