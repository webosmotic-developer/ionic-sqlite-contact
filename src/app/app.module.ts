import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SQLite } from '@ionic-native/sqlite';
import { HomePage } from '../pages/home/home';
import { ContactListPage } from '../pages/contact-list/contact-list';
import { ContactInfoPage } from '../pages/contact-info/contact-info';
import { AddContactPage } from '../pages/add-contact/add-contact';
import { ContactsProvider } from '../providers/contacts/contacts';
import { FormsModule } from '@angular/forms';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { UserProvider } from '../providers/user/user';
import { CommonProvider } from '../providers/common/common';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignUpPage,
    HomePage,
    ContactListPage,
    ContactInfoPage,
    AddContactPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignUpPage,
    HomePage,
    ContactListPage,
    ContactInfoPage,
    AddContactPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    ContactsProvider,
    UserProvider,
    ImagePicker,
    Base64,
    CommonProvider
  ]
})
export class AppModule {}
