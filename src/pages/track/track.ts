import {Component, ViewChild, ElementRef} from '@angular/core';

import {ConferenceData} from '../../providers/conference-data';

import {Platform} from 'ionic-angular';
import {NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';

declare var google:any;

@Component({
  selector: 'page-track',
  templateUrl: 'track.html'
})
export class TrackPage {

  @ViewChild('mapCanvas') mapElement:ElementRef;
  map:any;


  constructor(public confData:ConferenceData, public platform:Platform) {
  }

  ionViewDidLoad() {


    Geolocation.getCurrentPosition().then((position) => {
        // alert("Lat: " + position.coords.latitude + "Lng: " + position.coords.longitude);
        // let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        //
        // let mapOptions =
        // {
        //   center: latLng,
        //   zoom: 15,
        //   mapTypeId: google.maps.MapTypeId.ROADMAP
        // };
        //
        // this.mapCanvas = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        let mapEle = this.mapElement.nativeElement;
        let latLng = new google.maps.LatLng(position.coords.latitude.toString(), position.coords.longitude.toString());

        let map = new google.maps.Map(mapEle, {
          center: latLng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        let infoWindow = new google.maps.InfoWindow({
          content: `<h5>wawa ada kat sini.. culik dia cpttt..!!</h5>`
        });

        let marker = new google.maps.Marker({
          position: latLng,
          map: map,
          title: "Nama"
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        google.maps.event.addListenerOnce(map, 'idle', () => {
          mapEle.classList.add('show-map');
        });

      },
      (err) => {
        console.log(err);
      });

  }
/*
  addMarker() {

    let marker = new google.maps.Marker(
      {
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker:any, content:any) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }*/
}
