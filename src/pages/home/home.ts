import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;
  loggedIn: boolean = false;

  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps) {

  }
  // Load map only after view is initialized
  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    this.map = this.googleMaps.create(element);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => this.addMarker());
  }

  addMarker() {
    // create LatLng object
    let ionic: LatLng = new LatLng(43.0741904,-89.3809802);

    // create CameraPosition
    let position: AnimateCameraOptions = {
      target: ionic,
      zoom: 18,
      tilt: 30,
      duration: 2000
    };

    // move the map's camera to position
    this.map.animateCamera(position);

    // create new marker
    let markerOptions: MarkerOptions = {
      position: ionic,
      title: 'Ionic'
    };
    markerOptions.infoClick = () => { this.showDetails(markerOptions); }

    let markerOptions2: MarkerOptions = {
      position: new LatLng(43.074, -89.380),
      title: 'Moj pin',
      icon: '#0000FF'
    };
    markerOptions2.infoClick = () => { this.showDetails(markerOptions2); }

    this.addMarkerOnMap(markerOptions);
    this.addMarkerOnMap(markerOptions2);
  }

  addMarkerOnMap(markerOptions: MarkerOptions) {
    this.map.addMarker(markerOptions)
      .then((marker: Marker) => {
        // marker.showInfoWindow();
        //this.addEventListenerForMarker(marker, markerOptions);
      });
  }

  addEventListenerForMarker(marker: Marker, markerOptions: MarkerOptions) {
    marker.addEventListener(GoogleMapsEvent.MARKER_CLICK)
      .subscribe(e => { this.showDetails(markerOptions); });
  }

  showDetails(data: MarkerOptions) {
    this.navCtrl.push(DetailsPage, {
      'markerOptions': data
    })
  }
}
