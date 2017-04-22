import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  loggedIn: boolean = false;
  userProfile: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: Facebook) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
  }

  fbLogin() {
    if (this.loggedIn) { this.fbLogout(); return; }

    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        console.log('Logged into Facebook!', res);
        this.loggedIn = true;

        this.fb.api('/' + res.authResponse.userID + '?fields = id,name,email', []).then((data) => {
          //Get the user data
          this.userProfile = {
            access_token: res.authResponse.accessToken,
            name: data.name,
            id: data.id,
            email: data.email
          }
          //Get the user profile picture and save in user object
          this.fb.api('/' + res.authResponse.userID + '/picture?height=150&width=150&redirect=false', []).then((data) => {
            this.userProfile['profile_photo'] = data.data.url;
            //Get the user friends (using app)
            this.fb.api('/' + res.authResponse.userID + '/friends', []).then((data) => {
              this.userProfile['friends'] = data.data;
              this.getPictures();
            });
          });

        });
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  fbLogout() {
    this.fb.logout();
    this.loggedIn = false;
  }

  getPictures() {
    for (let friend of this.userProfile.friends) {
      this.fb.api('/' + friend.id + '/picture?redirect=false', [])
        .then((data) => {
          friend['profile_photo'] = data.data.url;
        });
    }
  }

  callOnMe() { alert('party')}

}
