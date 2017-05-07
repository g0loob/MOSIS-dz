import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";
import {Place} from "./place-service";
import {SQLite, SQLiteDatabaseConfig, SQLiteObject} from "@ionic-native/sqlite";
import {Platform} from "ionic-angular";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

interface DBPlace {
  id: number;
  name: string;
  imgurl: string;
  lat: number;
  lng: number;
  beercnt: number;
  coffeecnt: number
  userid: string;
}

interface DBUser {
  id: number;
  img: string;
  name: string;
  email: string;
  birthday: string;
}

@Injectable()
export class SqliteService {

  private sqlite: SQLite = new SQLite();
  private db: SQLiteObject;
  public dbSubject: Subject<boolean> = new Subject();

  constructor(private _platform: Platform) {
    this._platform.ready()
      .then(() => {
        let config: SQLiteDatabaseConfig = {
          name: 'mosis.db',
          location: 'default',
        };

        this.sqlite.create(config)
          .then((db: SQLiteObject) => {
            this.db = db;
            this.dbSubject.next(true);

            this.db.executeSql(
              'create table if not exists Places(' +
                'id integer primary key autoincrement,' +
                'name text not null,' +
                'imgurl text,' +
                'lat real not null,' +
                'lng real not null,' +
                'beercnt integer default 0,' +
                'coffeecnt integer default 0,' +
                'userid text not null);',
              [])
              .then((result) => console.log('Places table created!'))
              .catch(this.errorHandler);

            this.db.executeSql(
              'create table if not exists Users(' +
              'id integer primary key autoincrement,' +
              'name text not null,' +
              'img text,' +
              'email text,' +
              'birthday text);',
              [])
              .then((result) => console.log('Users table created!'))
              .catch(this.errorHandler);
          })
          .catch(this.errorHandler);
      });
  }

  private errorHandler(error) { alert(`SQLite error: ${JSON.stringify(error)}`); }

  private transformPlace(place: DBPlace): Place {
    return {
      id: place.id,
      name: place.name,
      imgUrl: place.imgurl,
      coordinates: {
        lat: place.lat,
        lng: place.lng
      },
      beerCnt: place.beercnt,
      coffeeCnt: place.coffeecnt,
      userId: place.userid
    }
  }

  public getPlaces(): Observable<Place[]> {
    let placesSubject: Subject<Place[]> = new Subject();
    if (this.db) {
      this.db.executeSql(`select * from Places`, [])
        .then((result) => {
          // let places: Place[] = [];
          let rowCount = result.rows.length, i;
          let places: Place[] = [];
          for (i = 0; i < rowCount; i++) {
            let dbPlace: DBPlace = result.rows.item(i);
            places.push(this.transformPlace(dbPlace));
          }
          placesSubject.next(places);
          placesSubject.complete();
        })
        .catch(this.errorHandler);
    }
    else {
      alert(`Database doesn't exist`);
    }
    return placesSubject;
  }

  public getUsers(): Observable<DBUser[]> {
    let usersSubject: Subject<DBUser[]> = new Subject();
    if (this.db) {
      this.db.executeSql(`select * from Users`, [])
        .then((result) => {
          let users: DBUser[] = [];
          let rowCount = result.rows.length, i;
          for (i = 0; i < rowCount; i++) {
            let dbPlace: DBUser = result.rows.item(i);
            users.push(dbPlace);
          }
          usersSubject.next(users);
          usersSubject.complete();
        })
        .catch(this.errorHandler);
    }
    else {
      alert(`Database doesn't exist`);
    }
    return usersSubject;
  }

  public getPlaceById(id: number): Observable<Place> {
    let placeSubject: Subject<Place> = new Subject();
    let place: Place;
    if (this.db) {
      this.db.executeSql(`select * from Places where id=${id};`, [])
        .then((result) => {
          place = this.transformPlace(result.rows.item(0));
          placeSubject.next(place);
          placeSubject.complete();
        })
        .catch(this.errorHandler);
    }
    else {
      alert(`db not exists`);
    }
    return placeSubject;
  }

  public getUserById(id: number): DBUser {
    let user: DBUser;
    if (this.db) {
      this.db.executeSql(`select * from Users where id=${id}`, [])
        .then((result) => {
          user = result.rows.item(0);
        })
        .catch(this.errorHandler);
    }
    else {
      throw `no db`;
    }
    return user;
  }

  public addPlace(place: Place): void {
    if (this.db) {
      this.db.executeSql(
        `insert into Places(name, imgurl, lat, lng, beercnt, coffeecnt, userid) 
         values ("${place.name}","${place.imgUrl}",${place.coordinates.lat},
         ${place.coordinates.lng},${place.beerCnt},${place.coffeeCnt},"${place.userId}");`,
        []
      )
        .then((result) => console.log(result))
        .catch(this.errorHandler);
    }
    else {
      throw `no db`;
    }
  }

  public addUser(user: DBUser): void {
    if (this.db) {
      this.db.executeSql(
        `insert into Users(name, img, email, birthday) 
         values ("${user.name}","${user.img}","${user.email}","${user.birthday}");`,
        []
      )
        .then((result) => console.log(result))
        .catch(this.errorHandler);
    }
    else {
      throw `no db`;
    }
  }

  public updatePlace(place: Place): void {
    if (this.db) {
      this.db.executeSql(
        `update Places 
         set name="${place.name}", imgurl="${place.imgUrl}",
         beercnt=${place.beerCnt}, coffeecnt=${place.coffeeCnt} 
         where id=${place.id};`,
        []
      )
        .then((result) => console.log(result))
        .catch(this.errorHandler);
    }
    else {
      throw `no db`;
    }
  }
}
