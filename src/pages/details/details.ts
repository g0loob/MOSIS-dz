import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MarkerOptions } from '@ionic-native/google-maps'

/**
 * Generated class for the Details page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  markerOptions: MarkerOptions;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Details');
    this.markerOptions = this.navParams.get('markerOptions');
  }

}
