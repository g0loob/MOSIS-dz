import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Facebook } from '@ionic-native/facebook';
import { GeolocationService } from "../providers/geolocation-service";
import { Camera } from '@ionic-native/camera';
import {ImagePicker} from "@ionic-native/image-picker";
import {IndexedDBService} from "../providers/indexed-db-service";
import {PlaceService} from "../providers/place-service";
import { Storage } from "@ionic/storage";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';
import { ProfilePage } from '../pages/profile/profile';
import { AboutPage } from "../pages/about/about";
import { PopoverPage } from "../pages/popover/popover";
import { AddPlacePage } from "../pages/addplace/addplace";
import {SQLite} from "@ionic-native/sqlite";

export function provideStorage() { return new Storage(SQLite); }

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage,
    ProfilePage,
    PopoverPage,
    AboutPage,
    AddPlacePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage,
    ProfilePage,
    PopoverPage,
    AboutPage,
    AddPlacePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GoogleMaps,
    Facebook,
    GeolocationService,
    Camera,
    ImagePicker,
    IndexedDBService,
    PlaceService,
    {provide: Storage, useFactory: provideStorage }
  ]
})
export class AppModule {}
