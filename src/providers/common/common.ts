import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonProvider {

  constructor(public http: HttpClient, public sqlite: SQLite) {
    console.log('Hello CommonProvider Provider');
  }

  makeConnection() {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'contact.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        resolve(db);
      }).catch(e => {
        reject(e);
      })
    });
  }

}
