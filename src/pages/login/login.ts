import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { RegistrarPage } from '../registrar/registrar';
import { RecuperarSenhaPage } from '../recuperar-senha/recuperar-senha';
import { AngularFireAuth } from '@angular/fire/auth';
import { Users } from './users';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  users: Users = new Users();
  @ViewChild('email') email;
  @ViewChild('password') password;
  tabBarElement: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public fire: AngularFireAuth,
    public toastCtrl: ToastController,
    public events: Events
  ) {
    this.tabBarElement = document.querySelector('.show-tabbar');
  }

  ngAfterViewInit() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null && tabs.length > 0) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'none';
      });
    }
  }

  ionViewWillLeave() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null && tabs.length > 0) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'none';
      });
    }
  }

  goToRegistrar() {
    this.navCtrl.push(RegistrarPage.name);
  }
  goToRecuperarSenha() {
    this.navCtrl.push(RecuperarSenhaPage.name);
  }
  loginFacebook() {
    /* this.fire.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(res => {
      console.log(res);
      //this.navCtrl.setRoot(TabsPage);
    }); */
  }
  entrar() {
    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });
    this.fire.auth.signInWithEmailAndPassword(this.email.value, this.password.value).then(data => {
      console.log(data);

      this.users.email = this.email.value;
      this.users.senha = this.password.value;
      this.events.publish('usuario', this.email.value);
      toast.setMessage('Logado com Sucesso');
      toast.present();
      this.navCtrl.setRoot(HomePage);


    }).catch((error: any) => {
      if (error.code == 'auth/invalid-email') {
        toast.setMessage('O e-mail digitado é invalido.');
      }
      else if (error.code == 'auth/user-disabled') {
        toast.setMessage('Esse usuario foi desabilitado.');
      }
      else if (error.code == 'auth/user-not-found') {
        toast.setMessage('Usuario não encontrado.');
      }
      else if (error.code == 'auth/wrong-password') {
        toast.setMessage('Senha não confere.');
      }
      toast.present();
    });
  }
}
