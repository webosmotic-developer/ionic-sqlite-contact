import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';
import { ContactListPage } from '../contact-list/contact-list';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginObj: any = {};
  public home: any = HomePage;
  public signUp: any = SignUpPage;
  public contactList: any = ContactListPage;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public _user: UserProvider) {
  }

  login() {
    let loggedInUsers: any;
    this._user.getLoggedInUser(this.loginObj).then(res => {
      if (res) {
        loggedInUsers = res;
        this._user.storeUserInfo(loggedInUsers[0]).then(res => {
          this.navCtrl.push(this.contactList);
        }).catch(err => {
          console.log('User Info not stored', err);
          alert('Incorrect Login credentials.');
          this.loginObj.uname = '';
          this.loginObj.password = '';
        });
      }
    }).catch(err => {
      console.log('Error occurred in getting loggedin user', err);
    });
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
  }

}
