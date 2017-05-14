import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Storage} from '@ionic/storage';

import 'rxjs/add/operator/map';

/*
  Generated class for the Setting provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Setting {

  constructor(public http: Http,public storage:Storage) {
    console.log('Hello Setting Provider');
  }
  
  public setEnableNotification(enableNotification:any){
    return this.storage.set('enableNotification', enableNotification).then(()=>{
      
    });
  }

  public setWarningDistance(warningDistance:any){
    return this.storage.set('warningDistance', warningDistance).then(()=>{
      
    });
  }
  public getEnableNotification(){
    return this.storage.get('enableNotification').then((data:any)=>{
      return data;
    });
  }

  public getWarningDistance(){
    return this.storage.get('warningDistance').then((data:any)=>{
      return data;
    });
  }
}
