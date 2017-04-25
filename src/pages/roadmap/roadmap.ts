import {Component, ViewChild, ElementRef} from '@angular/core';

import {ConferenceData} from '../../providers/conference-data';
import {GlobalService} from '../../providers/global-service';

import {Platform, Events} from 'ionic-angular';
import {NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {LocationTracker} from '../../providers/location-tracker';
import {Observable} from 'rxjs/Observable';
import {Storage} from '@ionic/storage';
import {LocalNotifications} from '@ionic-native/local-notifications';

declare var google:any;

@Component({
  selector: 'page-roadmap',
  templateUrl: 'roadmap.html'
})
export class RoadmapPage {

  @ViewChild('mapCanvas') mapElement:ElementRef;
  map:any;
  mapEle:any;
  latLng:any;
  infoWindow:any;
  marker:any;
  icons:any = {
    blueDot: 'assets/img/icon_bludot.png',
    carCrash: 'assets/img/car-crash.png',
  };
  public lat:number = 0;
  public lng:number = 0;

  markers:any = []; // Create a marker array to hold your markers
  locations:any = [];

  constructor(public globalService:GlobalService, private localNotifications:LocalNotifications, public storage:Storage, public confData:ConferenceData, public platform:Platform, public locationTracker:LocationTracker, public events:Events) {
  }

  ionViewDidLoad() {
    // this.getCurrentPosition();
    this.initialize();
    this.setHotspotsPosition();
    this.start();
  }

  initialize() {
    this.getCurrentPosition().subscribe((data:any)=> {
      var mapOptions = {
        zoom: 5,
        center: new google.maps.LatLng(data.lat, data.lng),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.mapEle = this.mapElement.nativeElement;
      this.map = new google.maps.Map(this.mapEle, mapOptions);
      this.latLng = new google.maps.LatLng(data.lat, data.lng);

      this.locations.push(['You', data.lat, data.lng, 999, this.icons.blueDot]);
      // Call set markers to re-add markers
      this.setMarkers(this.locations);

      this.mapEle.classList.add('show-map');
    });
  }

  setMarkers(locations:any) {
    for (var i = 0; i < locations.length; i++) {
      var location = locations[i];
      var myLatLng = new google.maps.LatLng(location[1], location[2]);
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        animation: google.maps.Animation.DROP,
        title: location[0],
        zIndex: location[3],
        icon: location[4]
      });

      // Push marker to markers array
      this.markers.push(marker);
    }
  }

  reloadMarkers() {
    // Loop through markers and set map to null for each
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }

    // Reset the markers array
    this.markers = [];

    // this.getCurrentPosition().subscribe((data:any)=> {
    this.latLng = new google.maps.LatLng(this.lat.toString(), this.lng.toString());

    /*var locations = [
     ['You', data.lat, data.lng, 1]
     ];*/
    // Call set markers to re-add markers
    this.setMarkers(this.locations);
    // });
  }


  start() {
    this.locationTracker.startTracking().subscribe((data:any)=> {
      this.events.subscribe('backgeo:reloaded', (lat:any, lng:any) => {
        this.lat = parseFloat(lat);
        this.lng = parseFloat(lng);

        //this.setHotspotsPosition();
        // this.setCurrentPosition(this.lat, this.lng);
        this.locations = [
          ['You', this.lat, this.lng, 999, this.icons.blueDot]
        ];
        this.setHotspotsPosition();
        this.reloadMarkers();
        this.determineStatus();
        this.globalService.toast(this.lat + ", " + this.lng).present();
      });
    });
  }

  stop() {
    this.locationTracker.stopTracking();
  }

  /*initMap() {
   this.mapEle = this.mapElement.nativeElement;

   this.getCurrentPosition().subscribe((data:any)=> {
   this.latLng = new google.maps.LatLng(data.lat.toString(), data.lng.toString());

   this.map = new google.maps.Map(this.mapEle, {
   center: this.latLng,
   zoom: 16,
   mapTypeId: google.maps.MapTypeId.ROADMAP
   });

   this.infoWindow = new google.maps.InfoWindow({
   content: `<h5>You</h5>`
   });

   this.marker = new google.maps.Marker({
   position: this.latLng,
   map: this.map,
   title: "You",
   icon: this.icons.blueDot
   });

   this.marker.addListener('click', () => {
   this.infoWindow.open(this.map, this.marker);
   });

   google.maps.event.addListenerOnce(this.map, 'idle', () => {
   this.mapEle.classList.add('show-map');
   });
   });
   }*/

  /*setCurrentPosition(latitude:number, longitude:number) {
   this.mapEle = this.mapElement.nativeElement;
   this.latLng = new google.maps.LatLng(latitude.toString(), longitude.toString());

   this.map = new google.maps.Map(this.mapEle, {
   center: this.latLng,
   zoom: 16,
   mapTypeId: google.maps.MapTypeId.ROADMAP
   });

   this.infoWindow = new google.maps.InfoWindow({
   content: `<h5>You</h5>`
   });

   this.marker = new google.maps.Marker({
   position: this.latLng,
   map: this.map,
   title: "You",
   icon: this.icons.blueDot
   });

   this.marker.addListener('click', () => {
   this.infoWindow.open(this.map, this.marker);
   });

   google.maps.event.addListenerOnce(this.map, 'idle', () => {
   this.mapEle.classList.add('show-map');
   });
   }*/

  getCurrentPosition() {
    return Observable.create((observer:any)=> {
      Geolocation.getCurrentPosition().then((position) => {
          console.log("position", position);
          observer.next({lat: position.coords.latitude, lng: position.coords.longitude});
          observer.complete();
        },
        (err:any) => {
          observer.next(err);
          observer.complete();
          console.log(err);
        });
    });

  }

  setHotspotsPosition() {
    this.mapEle = this.mapElement.nativeElement;

    this.locationTracker.getHotspots().subscribe((data:any)=> {
      var infowindow = new google.maps.InfoWindow();
      var marker:any, i:any;

      data.forEach((location:any)=> {
        this.locations.push(['Site ' + location.latitude + "," + location.longitude, location.latitude, location.longitude, 1, this.icons.carCrash]);
        // Call set markers to re-add markers
        // console.log(location.latitude, location.longitude);
        /*marker = new google.maps.Marker({
         position: new google.maps.LatLng(location.latitude, location.longitude),
         map: this.map,
         icon: this.icons.carCrash
         });

         google.maps.event.addListener(marker, 'click', (function (marker, i) {
         return function () {
         infowindow.setContent("Crash Area");
         infowindow.open(this.map, marker);
         }
         })(marker, i));*/
      });
    }, (error:any)=> {
      console.log(error);
    });

    this.setMarkers(this.locations);

  }

  determineStatus() {
    this.locationTracker.getHotspots().subscribe((data:any)=> {
      data.forEach((location:any)=> {
        // console.log(location.latitude, location.longitude);
        var position1:any = {
          latitude: parseFloat(this.latLng.lat()),
          longitude: parseFloat(this.latLng.lng())
        };
        var position2:any = {
          latitude: parseFloat(location.latitude),
          longitude: parseFloat(location.longitude)
        };

        var distance = this.locationTracker.getDistance(position1, position2);
        // trigger notification if distance below limit
        if (distance < 1000) {// 1000 meter
          this.localNotifications.schedule({
            id: 1,
            text: 'Be careful, You are approaching the accident area.',
            sound: this.platform.is('android') ? 'file://sound.mp3' : 'file://beep.caf',
            at: new Date(new Date().getTime() + 3600),
            led: 'FF0000',
            // data: {secret: key}
          });
        }
      });
    }, (error:any)=> {
      console.log(error);
    });
  }

}
