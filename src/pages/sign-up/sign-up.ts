import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/user/user';
import { ContactListPage } from '../contact-list/contact-list';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  public signUpObj: any = {};
  public userInfo: any = {};
  public login = LoginPage;
  public contactList = ContactListPage;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public _user: UserProvider) {
  }

  signUp() {
    this.signUpObj._id = Date.now();
    this._user.createUser(this.signUpObj).then(res => {
      this._user.storeUserInfo(this.signUpObj).then(res => {
        console.log('User Stored', res);
        this.navCtrl.push(this.contactList);
      }).catch(err => {
        console.log('User Info not stored', err);
      });
    }).catch(err => {
      console.log('Error Occurred in Creating User.', err);
    })
  }
}
