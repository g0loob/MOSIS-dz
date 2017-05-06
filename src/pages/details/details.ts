import { Component } from '@angular/core';
import {NavController, NavParams, PopoverController} from 'ionic-angular';
import {PopoverPage} from "../popover/popover";
import {Place} from "../../providers/place-service";
import {SqliteService} from "../../providers/sqlite-service";

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
  place: Place;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              private sqliteService: SqliteService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Details');
    let id = 1;//this.navParams.get('placeId');
    this.place = this.sqliteService.getPlaceById(id);
  }

  more(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
