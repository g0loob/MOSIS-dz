// import {Injectable} from "@angular/core";
// import "rxjs/add/operator/map";
// import {ReplaySubject} from "rxjs/ReplaySubject";
// import {Observable} from "rxjs/Observable";
//
//
export interface Place {
  id: number;
  name: string;
  imgUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  beerCnt: number;
  coffeeCnt: number;
  userId: string;
}
//
// @Injectable()
// export class PlaceService {
//   private _places: Place[] = [];
//   private _placesSubject: ReplaySubject<Place[]> = new ReplaySubject(1);
//   public places$: Observable<Place[]> = this._placesSubject.asObservable();
//
//   public getPlaces(): Place[] {
//     return this._places.map(place => ({
//       id: place.id,
//       name: place.name,
//       imgUrl: place.imgUrl,
//       coordinates: place.coordinates,
//       beerCnt: place.beerCnt,
//       coffeeCnt: place.coffeeCnt,
//       userId: place.userId
//     }));
//   }
//
//   public getPlaceById(id: number): Place {
//     let place = this._places.find(place => place.id == id);
//     if (place) {
//       return place;
//     } else {
//       throw `There is no place with an id ${id}!`;
//     }
//   }
//
//   public addNew(place: Place) {
//     this.indexedDB.addObject(place)
//       .subscribe(place => {
//         this._places.push(place);
//         this._placesSubject.next(this._places);
//       });
//   }
//
//   public editPlace(place: Place): void {
//     let el = this._places.find(element => element.id == place.id);
//     let index = this._places.indexOf(el);
//
//     if (index > -1) {
//       this.indexedDB.updateObject(place)
//         .subscribe(place => {
//           if (place) {
//             this._places[index] = place;
//             this._placesSubject.next(this._places);
//           }
//         });
//     } else {
//       throw `Place ${place.name} doesn't exist!`;
//     }
//   }
//
//   public deletePlace(placeId: number): void {
//     let el = this._places.find(element => element.id == placeId);
//     let index = this._places.indexOf(el);
//
//     if (index > -1) {
//       this.indexedDB.deleteObject(placeId)
//         .subscribe(status => {
//           if (status) {
//             this._places.splice(index, 1);
//             this._placesSubject.next(this._places);
//           }
//         });
//     } else {
//       throw `Place with id ${placeId} doesn't exist!`;
//     }
//   }
//
//   constructor(private indexedDB: IndexedDBService) {
//     this.indexedDB.dbSubject
//       .subscribe(opened => {
//         if (opened) {
//           this.indexedDB.getObjects()
//             .subscribe(places => {
//               this._places = places;
//               this._placesSubject.next(this._places);
//             })
//         }
//       })
//   }
// }
