import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CardapioPage } from '../pages/cardapio/cardapio';
import { CarrinhoPage } from '../pages/carrinho/carrinho';
import { ProdutosProvider } from '../providers/produtos/produtos';
import { RefrigerantesPage } from '../pages/refrigerantes/refrigerantes';
import { CartComprasProvider } from '../providers/cart-compras/cart-compras';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../pages/login/login';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { ProfilePage } from '../pages/profile/profile';
import { CadastrarNovoProdutoPage } from '../pages/cadastrar-novo-produto/cadastrar-novo-produto';
import { AreaAdministradorPage } from '../pages/area-administrador/area-administrador';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  public pages: Array<{titulo: string, componente: any, icone: string}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private provider: ProdutosProvider,
    private cartProvider: CartComprasProvider,
    private storage: Storage,
    ofAuth: AngularFireAuth,
    private firebase : FirebaseProvider,
    public events: Events,
  ) {
    this.initializeApp();

    events.subscribe('usuario', (email) => {
      if (email.toUpperCase() == "ADMIN@ADMIN.COM") {
        this.pages = [
          { titulo: 'Pagina Inicial', componente: HomePage, icone: "home" },
          { titulo: 'Pizzas', componente: CardapioPage.name, icone: "pizza" },
          { titulo: 'Refris', componente: RefrigerantesPage.name, icone: "pint" },
          { titulo: 'Carrinho', componente: CarrinhoPage.name, icone: "cart" },
          { titulo: 'Cardastrar Produto', componente: CadastrarNovoProdutoPage.name, icone: "barcode" },
          { titulo: 'Area Administrador', componente: AreaAdministradorPage.name, icone: "construct" },
          { titulo: 'Profile', componente: ProfilePage.name, icone: "person" }
        ];
      }
      else{
        this.pages = [
          { titulo: 'Pagina Inicial', componente: HomePage, icone: "home" },
          { titulo: 'Pizzas', componente: CardapioPage.name, icone: "pizza" },
          { titulo: 'Refris', componente: RefrigerantesPage.name, icone: "pint" },
          { titulo: 'Carrinho', componente: CarrinhoPage.name, icone: "cart" },
          { titulo: 'Profile', componente: ProfilePage.name, icone: "person" }
          
        ];
      }
    });

    const authObserver = ofAuth.authState.subscribe(users => {
      if (users) {
        this.events.publish('usuario', users.email);
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = LoginPage.name;
        authObserver.unsubscribe();
      }
    });
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.componente);
  }

}
