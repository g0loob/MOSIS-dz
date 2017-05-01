import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  AnimateCameraOptions,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { DetailsPage } from '../details/details';
import { ProfilePage } from '../profile/profile';
import { GeolocationService } from "../../providers/geolocation-service";
import { PopoverPage } from "../popover/popover";
import {AddPlacePage} from "../addplace/addplace";
import { Storage } from "@ionic/storage";
import {Place, PlaceService} from "../../providers/place-service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;
  myLastLocation: LatLng;
  markers: MarkerOptions[] = [];
  places: Place[];
  userId: string;

  constructor(public navCtrl: NavController,
              public popoverCtrl: PopoverController,
              private googleMaps: GoogleMaps,
              private geolocationService: GeolocationService,
              private placeService: PlaceService,
              private storage: Storage) {
  }
  // Load map only after view is initialized
  ngAfterViewInit() {
    this.loadMap();
    this.storage.get("userId").then(val => this.userId = val);
  }

  loadMap() {
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    this.map = this.googleMaps.create(element);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.moveCameraToMyLocation();
      this.addMarkersOnMap();
    });
  }

  moveCameraToMyLocation() {
    this.geolocationService.getCurrentPosition().then(position => {
      let cameraPosition: AnimateCameraOptions = {
        target: new LatLng(position.coords.latitude, position.coords.longitude),
        zoom: 15,
        duration: 2000
      };
      this.map.animateCamera(cameraPosition);
    });
  }

  addMarkersOnMap() {
    // this.placeService.places$
    //   .subscribe(places => {
    //     alert("addMarkersOnMap: " + places);
    //     places.forEach(place => {
    //       let markerOptions: MarkerOptions = {
    //         position: new LatLng(place.coordinates.lat, place.coordinates.lng),
    //         title: place.name + '\nBeer count: ' + place.beerCnt + '\nCoffee count: ' + place.coffeeCnt,
    //         icon: place.userId == this.userId ? "#0000FF" : "#FF0000"
    //       };
    //       markerOptions.infoClick = () => this.showDetails(place.id);
    //       this.map.addMarker(markerOptions).then((marker: Marker) => {});
    //       this.markers.push(markerOptions);
    //     })
    //   });
    for (let place of this.places) {
      let markerOptions: MarkerOptions = {
        position: new LatLng(place.coordinates.lat, place.coordinates.lng),
        title: place.name + '\nBeer count: ' + place.beerCnt + '\nCoffee count: ' + place.coffeeCnt,
        icon: place.userId == this.userId ? "#0000FF" : "#FF0000"
      };
      markerOptions.infoClick = () => this.showDetails(place.id);
      this.addMarker(markerOptions);
      this.markers.push(markerOptions);
    }
  }

  addMarker(markerOptions: MarkerOptions) {
    this.map.addMarker(markerOptions).then((marker: Marker) => {});
  }

  showDetails(placeId: number) {
    this.navCtrl.push(DetailsPage, {
      'placeId': placeId
    })
  }

  locateMe() {
    this.geolocationService.getCurrentPosition().then((position) => {
      this.removeMyLastLocationMarker();
      this.myLastLocation = new LatLng(position.coords.latitude, position.coords.longitude);
      let cameraPosition: AnimateCameraOptions = {
        target: this.myLastLocation,
        zoom: 17,
        duration: 2000
      };
      let markerOptions: MarkerOptions = {
        position: this.myLastLocation,
        // icon: 'https://www.easylocator.net/images/markers/blue_dot_circle_v2.png'// NJAMB'https://cdn0.iconfinder.com/data/icons/user-icons-4/100/user-17-256.png'
        icon: 'http://blog.ionic.io/wp-content/uploads/2015/05/cropped-logo-32x32.png'
      };
      this.addMarker(markerOptions);
      this.map.animateCamera(cameraPosition);
    }).catch(error => console.log('Error getting location', error))
  }

  removeMyLastLocationMarker() {
    this.map.clear();
    for (let marker of this.markers) {
      this.addMarker(marker);
    }
  }

  profile() {
    this.navCtrl.push(ProfilePage);
  }

  more(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  enablePin() {
    this.map.one(GoogleMapsEvent.MAP_CLICK)
      .then((position) => {
        this.navCtrl.push(AddPlacePage, {'position': position.toString()});
      })
      .catch((e) => alert('error map click: ' + e))
  }
}

