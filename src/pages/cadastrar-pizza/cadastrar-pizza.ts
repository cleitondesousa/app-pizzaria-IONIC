import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';



@IonicPage()
@Component({
  selector: 'page-cadastrar-pizza',
  templateUrl: 'cadastrar-pizza.html',
})
export class CadastrarPizzaPage {

  imgPath: string;
  fileToUpload: any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private imagepicker : ImagePicker
    ) {
  }


  escolherFoto(){
    this.imagepicker.hasReadPermission().then( hasPermission => {
      if (hasPermission) {
        this.pegarImagem();
      }else{
        this.solicitarPermissao();
      }
    }).catch(error => {
      console.log("erro ao verificar permissao", error);
      
    });
  }

  solicitarPermissao(){
    this.imagepicker.requestReadPermission().then( hasPermission => {
      if (hasPermission) {
        this.pegarImagem();
      }else{
        console.log("permissao negada");
      }
    }).catch(error => {
      console.log("Erro ao solicitar permissao", error);
      
    })
  }

  pegarImagem(){
    this.imagepicker.getPictures({
      maximumImagesCount: 1,
      outputType: 1
    }).then( results => {
      if (results.length > 0) {
        this.imgPath = "data:image/png;base64," + results[0];
        this.fileToUpload = results[0];
      }else{
        this.imgPath = "";
        this.fileToUpload = null;
      }
    }).catch(error => {
      console.log("erro ao recuperar a imagem", error);
      
    })
  }
}
