import { Component } from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {AboutPage} from "../about/about";

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  constructor(public viewCtrl: ViewController,
              public navCtrl: NavController) {}

  public ionViewCanLeave() {
    this.viewCtrl.dismiss();
  }

  about() {
    this.navCtrl.push(AboutPage);
  }
}
