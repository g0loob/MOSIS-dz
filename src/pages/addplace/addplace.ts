import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";

/**
 * Generated class for the Addplace page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-addplace',
  templateUrl: 'addplace.html',
})
export class AddPlacePage {
  place: any = {
    name: '',
    image: '',
    lat: '',
    lng: ''
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera,
              private imagePicker: ImagePicker) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Addplace');
    let pos: string[] = this.navParams.get('position')
      .split(',')
      .map(s => s.trim());
    this.place['lat'] = pos[0];
    this.place['lng'] = pos[1];
    this.place['name'] = '';
    this.place['image'] = '';
  }

  takePicture() {
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
    };

    this.camera.getPicture(options)
      .then(imgUrl => this.place.image = imgUrl);
  }

  pickPicture() {
    let options: ImagePickerOptions = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options)
      .then((images) => {
        this.place.image = images[0]; // first & only image
      })
      .catch(e => console.log("error: " + e));
  }

  addPlace() {

  }

  cancel() {
    this.navCtrl.pop();
  }
}
