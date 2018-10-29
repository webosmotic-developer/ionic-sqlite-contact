import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import { CommonProvider } from '../common/common';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(public http: HttpClient, 
              public sqlite: SQLite,
              public storage: Storage,
              public _common: CommonProvider) {
    console.log('Hello UserProvider Provider');
  }

  checkAndCreateTable() {
    return new Promise((resolve, reject) => {
      this._common.makeConnection().then((db: any) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS tblUsers(id INTEGER PRIMARY KEY, name VARCHAR(32), username VARCHAR(32), password VARCHAR(32))', [])
        .then(() => {
          resolve(db);
        })
        .catch((e) => {
          console.log('TblErr', e)
          reject(e);
        });
      }).catch(e => {
        console.log('Error occurred in making connection to DB', e);
        reject(e);
      });
    });
  }

  createUser(obj){
    return new Promise((resolve, reject) => {
      this.checkAndCreateTable().then((db: any) => {
        db.executeSql('INSERT INTO tblUsers VALUES(?,?,?,?)',[obj._id, obj.name, obj.uname, obj.password])
        .then(res => {
          resolve(res);
        })
        .catch((e) => { 
          console.log('Error Occurred in Inserting Data.', e);
          reject(e);
        });
      }).catch(e => {
        console.log('Error occurred in Creating table', e);
        reject(e);
      });
    });
  }

  storeUserInfo(obj) {
    return new Promise((resolve, reject) => {
      const token = window.btoa(obj.uname + obj.password + obj._id);
      const userInfo = {
        token: token,
        username: obj.uname,
        userId: obj._id
      }
      this.setStorage('userInfo', userInfo).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });    
    });
  }

  removeUserInfo() {
    return new Promise((resolve, reject) => {
      this.storage.remove('userInfo').then(res => {
        resolve(res);
      }).catch(err => {
        console.log('Error occurred in logging out', err);
        reject(err);
      });
    });
  }
 
  setStorage(key, value) {
    return new Promise((resolve, reject) => {
      this.storage.set(key, value).then(res => {
        console.log('Token Generated', value);
        resolve(res);
      }).catch(err => {
        console.log('Token not Generated', err);
        reject(err);
      })
    });
  }

  getStorage(key) {
    return this.storage.get(key);
  }

  getAllUsers() {
    const arr = [];
    return new Promise((resolve, reject) => {
      this._common.makeConnection().then((db: any) => {
        db.executeSql('SELECT * FROM tblUsers', [])
        .then(res => {
          for(var i=0; i<res.rows.length; i++) {
            arr.push({_id:res.rows.item(i).id, name:res.rows.item(i).name, uname:res.rows.item(i).username, password:res.rows.item(i).password});
          }
          resolve(arr);
        })
        .catch((e) => { 
          console.log('Error occurred in fetching Contacts', e);
          reject(e);
        });          
      }).catch(err => {
        console.log('Error occurred in making connection to DB', err);
        reject(err);
      });
    });
  }

  getLoggedInUser(obj) {
    let arr = [];
    return new Promise((resolve, reject) => {
      this._common.makeConnection().then((db: any) => {
        db.executeSql('SELECT * FROM tblUsers WHERE username=? AND password=?', [obj.uname, obj.password])
        .then(res => {
          for(var i=0; i<res.rows.length; i++) {
            arr.push({_id:res.rows.item(i).id, name:res.rows.item(i).name, uname:res.rows.item(i).username, password:res.rows.item(i).password});
          }
          resolve(arr);
        })
        .catch((e) => { 
          console.log('Error occurred in fetching LoggedInUser', e);
        });
      }).catch(e => {
        console.log('Error occurred in making connection to DB', e);
        reject(e);
      });
    });
  }
}
