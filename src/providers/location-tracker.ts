import {Injectable, NgZone} from '@angular/core';
import {Http} from '@angular/http';
import {GlobalService} from './global-service';
import {Geolocation, Geoposition, BackgroundGeolocation} from 'ionic-native';
import {Events} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

@Injectable()
export class LocationTracker {

  public watch:any;
  public lat:number = 0;
  public lng:number = 0;

  constructor(public http:Http, public zone:NgZone, public events:Events, public globalService:GlobalService) {

  }

  startTracking() {
    return Observable.create((observer:any) => {
      // Background Tracking
      let config = {
        desiredAccuracy: 0,
        stationaryRadius: 20,
        distanceFilter: 10,
        debug: true,
        interval: 1000
      };

      BackgroundGeolocation.configure((location:any) => {
        console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

        // Run update inside of Angular's zone
        this.zone.run(() => {
          this.lat = location.latitude;
          this.lng = location.longitude;
        });

      }, (error:any) => {
        console.log(error);
      }, config);

      // Turn ON the background-geolocation system.
      BackgroundGeolocation.start();

      // Foreground Tracking
      let options = {
        frequency: 3000,
        enableHighAccuracy: true
      };

      this.watch = Geolocation.watchPosition(options).filter((p:any) => p.code === undefined).subscribe((position:Geoposition) => {
        console.log(position);

        // Run update inside of Angular's zone
        this.zone.run(() => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
        });

        this.events.publish('backgeo:reloaded', this.lat, this.lng);

        observer.next({lat: this.lat, lng: this.lng});
        observer.complete();

      });
    });
  }

  stopTracking() {
    console.log('stopTracking');

    BackgroundGeolocation.finish();
    this.watch.unsubscribe();
  }

  getHotspots() {
    return Observable.create((observer:any) => {
      var requestData = {
        user_id: 1
      };

      this.http.post(this.globalService.backend.getHotspotsUrl, requestData)
        .subscribe((responseData:any) => {
          observer.next(responseData.json());
          observer.complete();
        }, (error:any) => {
          observer.next(false);
          observer.complete();
          console.log(error);
        });
    });
  }

  rad(x:any) {
    return x * Math.PI / 180;
  };

  getDistance(position1:any, position2:any) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = this.rad(position2.latitude - position1.latitude);
    var dLong = this.rad(position2.longitude - position1.longitude);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(position1.latitude)) * Math.cos(this.rad(position2.latitude)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
  };

}
