import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  map: GoogleMap;

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

  addMarker() : void {
    // create LatLng object
    let ionic: LatLng = new LatLng(43.0741904,-89.3809802);

    // create CameraPosition
    let position: CameraPosition = {
      target: ionic,
      zoom: 18,
      tilt: 30
    };

    // move the map's camera to position
    this.map.moveCamera(position);

    // create new marker
    let markerOptions: MarkerOptions = {
      position: ionic,
      title: 'Ionic'
    };

    this.map.addMarker(markerOptions)
      .then((marker: Marker) => {
        marker.showInfoWindow();
      });
  }
}
