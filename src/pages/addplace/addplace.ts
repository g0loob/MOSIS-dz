import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
  place: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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

}
