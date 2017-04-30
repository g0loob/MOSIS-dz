import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, PopoverController} from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import {PopoverPage} from "../popover/popover";

export interface User {
  id: string,
  email: string,
  birthday: string,
  access_token: string,
  profile_photo: string,
  name: string,
  friends: any
}

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  loggedIn: boolean = false;
  canEdit: boolean = false;
  userProfile: User = {
    id: '',
    email: '',
    birthday: '',
    access_token: '',
    profile_photo: '',
    name: '',
    friends: []
  };
  emailBeforeEdit: string = '';
  birthdayBeforeEdit: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              public alertCtrl: AlertController,
              private fb: Facebook) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
    this.fbSilentLogin();
  }

  fbSilentLogin() {
    this.fb.getLoginStatus().then(data => {
      if (data.status == "connected") {
        this.setUserData(data);
      }
    });
  }

  setUserData(data: any) {
    this.userProfile.id = data.authResponse.userID;
    this.userProfile.access_token = data.authResponse.accessToken;

    // load user 'friends'
    this.getUserData();

    this.loggedIn = true;
  }

  fbLogin() {
    if (this.loggedIn) { this.fbLogout(); return; }

    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        this.setUserData(res);
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  getUserData() {
    this.fb.api('/' + this.userProfile.id + '?fields = name', []).then((data) => {
      //Get the user data
      this.userProfile.name = data.name;
      //Get the user profile picture and save in user object
      this.fb.api('/' + this.userProfile.id + '/picture?height=150&width=150&redirect=false', []).then((data) => {
        this.userProfile.profile_photo = data.data.url;
      });
    });
  }

  fbLogout() {
    this.fb.logout();
    this.loggedIn = false;
  }

  edit() {
    this.canEdit = true;
    this.emailBeforeEdit = this.userProfile.email;
    this.birthdayBeforeEdit = this.userProfile.birthday;
  }

  cancel() {
    this.canEdit = false;
    this.userProfile.email = this.emailBeforeEdit;
    this.userProfile.birthday = this.birthdayBeforeEdit;
  }

  checkEmail() {
    let regexp = new RegExp('^[a-zA-Z0-9_\.]+@[a-zA-Z0-9]+\.[a-z]{2,3}$');
    if (this.userProfile.email == '' || regexp.test(this.userProfile.email)) {
      this.canEdit = false;
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: "Invalid email address!",
        buttons: ['OK']
      });
      alert.present();
    }
  }

  more(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }
}
