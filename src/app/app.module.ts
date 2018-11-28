import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ImagePicker } from '@ionic-native/image-picker';
import { ProdutosProvider } from '../providers/produtos/produtos';
import { CartComprasProvider } from '../providers/cart-compras/cart-compras';
import { IonicStorageModule } from '@ionic/storage';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { FirebaseProvider } from '../providers/firebase/firebase';


var config = {
  apiKey: "AIzaSyBit2KnZTAp_42MkWH-P2wa2RWmxyKvsgA",
  authDomain: "applapizzaria.firebaseapp.com",
  databaseURL: "https://applapizzaria.firebaseio.com",
  projectId: "applapizzaria",
  storageBucket: "applapizzaria.appspot.com",
  messagingSenderId: "482286399403"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(config, 'easyabtn'),
    AngularFireModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProdutosProvider,
    CartComprasProvider,
    FirebaseProvider,
    ImagePicker
  ]
})
export class AppModule {}
