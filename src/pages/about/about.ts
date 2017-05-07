import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the About page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  @ViewChild('logo')
  public logo: ElementRef;

  appName: String = "GeoDrink";
  golub: String = "Stefan Golubović - 14656";
  njamb: String = "Aleksa Njamb Jovanović - 14684";
  fax: String = "Faculty of Electronic Engineering in Niš";
  email: String = "support@support.com"

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngAfterViewInit() {
    this.drawLogo();
  }

  private drawLogo() {
    let context = this.logo.nativeElement.getContext('2d');

    // context.strokeStyle = '#FFFFFF';
    // context.lineWidth = 1;

// Border:
//     context.lineJoin = 'miter';
//     context.lineCap = 'round';
//     context.beginPath();
//     context.moveTo(0,0);
//     context.lineTo(0, 128);
//     context.lineTo(128, 128);
//     context.lineTo(128, 0);
//     context.lineTo(0, 0);
//     context.stroke();
//

// Content:
    context.lineWidth = 2;
    context.fillStyle = '#FFFFFF';
    context.lineJoin = 'miter';
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(40, 40);
    context.lineTo(40, 95);
    context.lineTo(80, 95);
    context.lineTo(80, 40);
    context.lineTo(40, 40);
    context.fill();

// Blue line:
    context.strokeStyle = '#2bcaff';
    context.beginPath();
    context.moveTo(40, 54);
    context.lineTo(80, 54);
    context.stroke();

// Upper part of the handle:
    context.strokeStyle = '#FFFFFF';
    context.beginPath();
    context.moveTo(80, 49);
    context.lineTo(98, 49);
    context.lineTo(98, 67);
    context.lineTo(89, 67);
    context.lineTo(89, 58);
    context.lineTo(80, 58);
    context.lineTo(80, 49);
    context.fill();

// Lower part of the handle:
    context.beginPath();
    context.moveTo(80, 76);
    context.lineTo(89, 76);
    context.lineTo(89, 67);
    context.lineTo(98, 67);
    context.lineTo(98, 85);
    context.lineTo(80, 85);
    context.lineTo(80, 76);
    context.fill();

// Beer foam:
    context.beginPath();
    context.arc(45, 40, 13, 0, 2 * 13 * Math.PI);
    context.arc(58, 45, 10, 0, 2 * 10 * Math.PI);
    context.arc(45, 54, 10, 0, 2 * 10 * Math.PI);
    context.arc(40, 67, 5, 0, 2 * 5 * Math.PI);
    context.fill();

// Pin:
    context.fillStyle = '#2bcaff';
    context.beginPath();
    context.arc(60, 69, 9, 0, 9 * Math.PI);
    context.fill();

    context.beginPath();
    context.moveTo(51, 70);
    context.lineTo(69, 70);
    context.lineTo(60, 90);
    context.lineTo(51, 70);
    context.fill();

    context.fillStyle = '#FFFFFF';
    context.beginPath();
    context.arc(60, 69, 4, 0, 2 * 4 * Math.PI);
    context.fill();
  }



}
