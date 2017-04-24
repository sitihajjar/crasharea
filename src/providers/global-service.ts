import {Injectable, Component, ViewChild, ElementRef} from '@angular/core';
import {DatePipe} from "@angular/common";
import {Storage} from '@ionic/storage';
import {Http} from '@angular/http';
import {LoadingController, AlertController, ToastController, ModalController} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {ModalPage} from "../pages/modal/modal";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Rx";

@Injectable()
export class GlobalService {
  datePipeMy:DatePipe = new DatePipe('en-US');
  backend:any = {
    protocol: "https://",
    // baseUrl: "localhost:8000",
    baseUrl: "mexists:8238Gt@crashalert.cryptical.tech",
    loginUrl: "/login.php",
    getHotspotsUrl: '/hotspots.php',
  };
  public measurementUnit = 'Meters';

  constructor(public storage:Storage, public http:Http, private alertCtrl:AlertController,
              public toastCtrl:ToastController, public loadingCtrl:LoadingController,
              public modalCtrl:ModalController) {
    this.backend.baseUrl = this.backend.protocol + this.backend.baseUrl;
    this.backend.loginUrl = this.backend.baseUrl + this.backend.loginUrl;
    this.backend.getHotspotsUrl = this.backend.baseUrl + this.backend.getHotspotsUrl;
  }

  getStorage(key:string) {
    return this.storage.get(key);
  }

  setStorage(key:string, data:any) {
    this.storage.set(key, data);
  }

  toast(message:string, duration:number = 4000, position:string = 'bottom', showCloseButton:boolean = true, closeButtonText:string = 'Ok') {
    return this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
      showCloseButton: showCloseButton,
      closeButtonText: closeButtonText
    });
  }

  loading(content:string) {
    return this.loadingCtrl.create({
      content: content,
      // duration: duration,
      dismissOnPageChange: true
    });
  }

  alert(title:string, subTitle:string, message?:string, buttons:any = ['Ok']) {
    return this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      message: message,
      buttons: buttons
    });
  }

  modal(data:any, title:any = '') {
    return this.modalCtrl.create(ModalPage, {title: title, data: data});
  }

  signup(signup:any){
    // console.log(login);
    return Observable.create((observer:any) => {
      // At this point make a request to your backend to make a real check!
      var requestData = ({
        username: signup.username,
        password: signup.password,
        email: "hajjar@email.com",
      });
      // let headers = new Headers({'Content-Type': 'application/json'});
      // let options = new RequestOptions({headers: headers});
      this.http.post("https://crashalert.cryptical.tech/register.php", requestData/*, options*/)
        .subscribe((responseData:any) => {
          console.log(responseData);
          observer.next(responseData.json());
          observer.complete();
        }, (error:any) => {
          observer.next(error);
          observer.complete();
          console.log(error);
        });
    });
  }

  login(login:any){
    // console.log(login);
    return Observable.create((observer:any) => {
      // At this point make a request to your backend to make a real check!
      var requestData = ({
        username: login.username,
        password: login.password,
      });
      // let headers = new Headers({'Content-Type': 'application/json'});
      // let options = new RequestOptions({headers: headers});
      this.http.post("https://crashalert.cryptical.tech/login.php", requestData/*, options*/)
        .subscribe((responseData:any) => {
          console.log(responseData);
          observer.next(responseData.json());
          observer.complete();
        }, (error:any) => {
          observer.next(error);
          observer.complete();
          console.log(error);
        });
    });
  }


  getDateFromFormat(format:string = 'd MMM y', date:Date = new Date()):string {
    return this.datePipeMy.transform(date, format);
  }

  getLocalISOTimeString():string {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    return (new Date(Date.now() - tzoffset)).toISOString();
  }

  getLocalISOTime():Date {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    return (new Date(Date.now() - tzoffset));
  }

  getLocalISOTimeNext(ymdhis:string, period:number = 1):Date {
    var time = new Date();

    switch (ymdhis.toUpperCase().trim()) {
      default:
      case 'Y'://year
        time = new Date(new Date(this.getLocalISOTime())
          .setFullYear(this.getLocalISOTime()
              .getFullYear() + period));
        break;
      case 'M'://month
        time = new Date(new Date(this.getLocalISOTime())
          .setMonth(this.getLocalISOTime()
              .getMonth() + period));
        break;
      case 'D'://day
        time = new Date(new Date(this.getLocalISOTime())
          .setDate(this.getLocalISOTime()
              .getDate() + period));
        break;
      case 'H'://hour
        time = new Date(new Date(this.getLocalISOTime())
          .setHours(this.getLocalISOTime()
              .getHours() + period));
        break;
      case 'I'://minutes
        time = new Date(new Date(this.getLocalISOTime())
          .setMinutes(this.getLocalISOTime()
              .getMinutes() + period));
        break;
      case 'S'://second
        time = new Date(new Date(this.getLocalISOTime())
          .setSeconds(this.getLocalISOTime()
              .getSeconds() + period));
        break;
    }

    return time;
  }

  shuffle(sourceArray:any) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
      var j = i + Math.floor(Math.random() * (sourceArray.length - i));

      var temp = sourceArray[j];
      sourceArray[j] = sourceArray[i];
      sourceArray[i] = temp;
    }
    return sourceArray;
  }


  /**
   * Sort object properties (only own properties will be sorted).
   * @param {object} obj object to sort properties
   * @param {string|int} sortedBy 1 - sort object properties by specific value.
   * @param {bool} isNumericSort true - sort object properties as numeric value, false - sort as string value.
   * @param {bool} reverse false - reverse sorting.
   * @returns {Array} array of items in [[key,value],[key,value],...] format.
   */
  sortProperties(obj:any, sortedBy:any, isNumericSort:any, reverse:any) {
    sortedBy = sortedBy || 1; // by default first key
    isNumericSort = isNumericSort || false; // by default text sort
    reverse = reverse || false; // by default no reverse

    var reversed:any = (reverse) ? -1 : 1;

    var sortable:any = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        sortable.push([key, obj[key]]);
      }
    }
    if (isNumericSort)
      sortable.sort(function (a:any, b:any) {
        return reversed * (a[1][sortedBy] - b[1][sortedBy]);
      });
    else
      sortable.sort(function (a:any, b:any) {
        var x = a[1][sortedBy].toLowerCase(),
          y = b[1][sortedBy].toLowerCase();
        return x < y ? reversed * -1 : x > y ? reversed : 0;
      });
    return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
  }

  sortObjects(obj:any, sortedBy:any, isNumericSort:any, reverse:any) {
    var newObject:any = {};

    var sortedArray = this.sortProperties(obj, sortedBy, isNumericSort, reverse);
    for (var i = 0; i < sortedArray.length; i++) {
      var key = sortedArray[i][0];
      var value = sortedArray[i][1];

      newObject[key] = value;
    }

    return newObject;
  }

}
