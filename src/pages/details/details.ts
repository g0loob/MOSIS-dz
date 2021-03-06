import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {PopoverPage} from "../popover/popover";
import {Place} from "../../providers/place-service";
import {DBUser, SqliteService} from "../../providers/sqlite-service";
import {Storage} from "@ionic/storage";

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
  userId: string;
  user: DBUser;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              private sqliteService: SqliteService,
              private alertCtrl: AlertController,
              private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Details');
    this.storage.get('userId').then(val => this.userId = val);
    let id = this.navParams.get('placeId');
    this.sqliteService.getPlaceById(id).subscribe(place => {
      this.place = place;
      this.sqliteService.getUserById(Number(this.place.userId)).subscribe(user => {
        this.user = user;
      });
    });
  }

  more(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  checkin() {
    let prompt = this.alertCtrl.create();
    prompt.setTitle('Check in');

    prompt.addInput({
      type: 'checkbox',
      label: 'Beer',
      value: 'b',
    });

    prompt.addInput({
      type: 'checkbox',
      label: 'Coffee',
      value: 'c'
    });

    prompt.addButton('Cancel');
    prompt.addButton({
      text: 'OK',
      handler: data => {
        for (let d of data) {
          if (d == 'b') this.place.beerCnt++;
          if (d == 'c') this.place.coffeeCnt++;
        }
        this.sqliteService.updatePlace(this.place);
      }
    });
    prompt.present();
  }

}
