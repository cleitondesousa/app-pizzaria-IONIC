import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { RecuperarSenhaPage } from '../recuperar-senha/recuperar-senha';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {

  @ViewChild('usuario') user;
  @ViewChild('senha') pass;
  public registerForm: any;
  tabBarElement: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public fire: AngularFireAuth
  ) {
    this.tabBarElement = document.querySelector('.show-tabbar');

    this.registerForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.maxLength(20),
      Validators.required])],
    });
  }

  ionViewWillEnter() {
    let tabs = document.querySelectorAll('.show-tabbar');
    console.log(tabs);
    if (tabs !== null && tabs.length > 0) {
      this.tabBarElement.style.display = 'none';
    }
  }

  ionViewWillLeave() {
    let tabs = document.querySelectorAll('.show-tabbar');
    console.log(tabs);
    if (tabs !== null && tabs.length > 0) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'none';
      });
    }
  }

  registrar() {

    let toast = this.toastCtrl.create({ duration: 3000, position: 'bottom' });

    if (this.registerForm.valid) {

      this.fire.auth.createUserWithEmailAndPassword(this.user.value, this.pass.value).then(data => {
        console.log(data);
        toast.setMessage('Cadastro Efetuado com Sucesso!');
        toast.present();
        this.navCtrl.setRoot(HomePage);

      }).catch((error: any) => {
        if (error.code == 'auth/email-already-in-use') {
          toast.setMessage('O e-mail digitado ja esta em uso.');
        }
        else if (error.code == 'auth/invalid-email') {
          toast.setMessage('O e-mail digitado não é valido.');
        }
        else if (error.code == 'auth/operation-not-allowed') {
          toast.setMessage('Não esta habilitado criar usuarios.');
        }
        else if (error.code == 'auth/weak-password') {
          toast.setMessage('Ei essa senha é muito fraca.');
        }
        toast.present();
      });

    }
  }

  goToRecuperarSenha() {
    this.navCtrl.push(RecuperarSenhaPage.name);
  }

}
