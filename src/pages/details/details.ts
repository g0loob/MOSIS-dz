import { Component } from '@angular/core';
import {NavController, NavParams, PopoverController} from 'ionic-angular';
import { MarkerOptions } from '@ionic-native/google-maps'
import {PopoverPage} from "../popover/popover";

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Details');
    this.markerOptions = this.navParams.get('markerOptions');
  }

  more(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
