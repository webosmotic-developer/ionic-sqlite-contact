import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {SQLite} from '@ionic-native/sqlite';
import {CommonProvider} from '../common/common';

/*
  Generated class for the ContactsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ContactsProvider {
  constructor(public http: HttpClient,
              public sqlite: SQLite,
              public _common: CommonProvider) {
    console.log('Hello ContactsProvider Provider');
  }

  checkAndCreateTable() {
    return new Promise((resolve, reject) => {
      this._common.makeConnection().then((db: any) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS tblContacts(id INTEGER PRIMARY KEY, name VARCHAR(32), address VARCHAR(32), username VARCHAR(32), avatar VARCHAR(32))', [])
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

  alterTable(columnInfo) {
    return new Promise((resolve, reject) => {
      this._common.makeConnection().then((db: any) => {
        db.executeSql('ALTER TABLE tblContacts ADD COLUMN ' + columnInfo.name + ' ' + columnInfo.type + ';', [])
          .then(res => {
            resolve(res);
          })
          .catch((e) => {
            console.log('TblErr', e);
            reject(e);
          });
      }).catch(err => {
        console.log('Error occurred in connecting to DB', err);
        reject(err)
      })
    });
  }

  getAllContacts(username?) {
    const arr = [];
    return new Promise((resolve, reject) => {
      this._common.makeConnection().then((db: any) => {
        if (username) {
          db.executeSql('SELECT * FROM tblContacts WHERE username=?', [username])
            .then(res => {
              for (var i = 0; i < res.rows.length; i++) {
                arr.push({
                  _id: res.rows.item(i).id,
                  name: res.rows.item(i).name,
                  address: res.rows.item(i).address,
                  avatar: res.rows.item(i).avatar
                });
              }
              resolve(arr);
            })
            .catch((e) => {
              console.log('Error occurred in fetching Contacts', e);
              reject(e);
            });
        } else {
          db.executeSql('SELECT * FROM tblContacts', [])
            .then(res => {
              for (var i = 0; i < res.rows.length; i++) {
                arr.push({
                  _id: res.rows.item(i).id,
                  name: res.rows.item(i).name,
                  address: res.rows.item(i).address,
                  avatar: res.rows.item(i).avatar
                });
              }
              resolve(arr);
            })
            .catch((e) => {
              console.log('Error occurred in fetching Contacts', e);
              reject(e);
            });
        }
      }).catch(err => {
        console.log('Error occurred in making connection to DB', err);
        reject(err);
      });
    });
  }

  addContact(obj) {
    return new Promise((resolve, reject) => {
      this.checkAndCreateTable().then((db: any) => {
        db.executeSql('INSERT INTO tblContacts VALUES(?,?,?,?,?)', [obj._id, obj.name, obj.address, obj.username, obj.avatar])
          .then(res => {
            resolve(res);
          })
          .catch((e) => {
            if (e.code === 5) {
              console.log('Inserted');
            } else {
              console.log('Error Occurred in Inserting Data.', e);
              reject(e);
            }
          });
      }).catch(e => {
        console.log('Error occurred in creating table', e);
        reject(e);
      });
    });
  }

  updateContact(obj) {
    return new Promise((resolve, reject) => {
      this._common.makeConnection().then((db: any) => {
        db.executeSql('UPDATE tblContacts SET name=?, address=?, username=?, avatar=? WHERE id=?', [obj.name, obj.address, obj.user, obj.avatar, obj._id])
          .then(res => {
            resolve(res);
          })
          .catch(e => {
            console.log('Error Occurred in Updating Data.', e)
            reject(e);
          });
      }).catch(err => {
        console.log('Error occurred in making connection to DB', err);
        reject(err);
      });
    });
  }

  removeContact(id) {
    return new Promise((resolve, reject) => {
      this._common.makeConnection().then((db: any) => {
        db.executeSql('DELETE FROM tblContacts WHERE id=?', [id])
          .then(res => {
            resolve(res);
          })
          .catch(e => {
            console.log('Error Occurred in Deleting Data.', e)
            reject(e);
          });
      }).catch(err => {
        console.log('Error occurred in making connection to DB', err);
        reject(err);
      });
    });
  }

  clearContacts(username?) {
    return new Promise((resolve, reject) => {
      this._common.makeConnection().then((db: any) => {
        db.executeSql('DELETE FROM tblContacts WHERE username=?', [username])
          .then(res => {
            resolve(res);
          })
          .catch(e => {
            console.log('Error Occurred in Clearing Data.', e)
            reject(e);
          });
      }).catch(err => {
        console.log('Error occurred in making connection to DB', err);
        reject(err);
      })
    });
  }
}
