import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {Place, PlaceService} from "../../providers/place-service";

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
  place: Place = {
    id: Date.now(),
    name: '',
    imgUrl: '',
    coordinates: {
      lat: 0,
      lng: 0
    },
    beerCnt: 0,
    coffeeCnt: 0,
    userId: '2'
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private camera: Camera,
              private imagePicker: ImagePicker,
              private placeService: PlaceService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Addplace');
    let pos: string[] = this.navParams.get('position')
      .split(',')
      .map(s => s.trim());
    this.place.coordinates.lat = Number(pos[0]);
    this.place.coordinates.lng = Number(pos[1]);
  }

  takePicture() {
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
    };

    this.camera.getPicture(options)
      .then(imgUrl => this.place.imgUrl = imgUrl);
  }

  pickPicture() {
    let options: ImagePickerOptions = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options)
      .then((images) => {
        this.place.imgUrl = images[0]; // first & only image
      })
      .catch(e => console.log("error: " + e));
  }

  addPlace() {
    this.place.beerCnt = Number(this.place.beerCnt);
    this.place.coffeeCnt = Number(this.place.coffeeCnt);
    alert(JSON.stringify(this.place));
    // this.placeService.addNew(this.place);
    // this.navCtrl.pop();
  }

  cancel() {
    this.navCtrl.pop();
  }
}
