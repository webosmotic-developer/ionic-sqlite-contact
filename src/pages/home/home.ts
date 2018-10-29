import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ContactListPage } from '../contact-list/contact-list';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  contactList: any;  
  loggedInUser: any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _user: UserProvider) {
    this.contactList = ContactListPage;
    this.loggedInUser = {
      token: '',
      username: '',
      userId: ''
    }
    this.getLoginUser();
  }

  getLoginUser() {
    this._user.getStorage('userInfo').then(res => {
      this.loggedInUser = res;
    }).catch(err => {
      console.log('Error occured in fetching userInfo storage data', err);
    });
  }
}
