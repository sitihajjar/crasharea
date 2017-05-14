import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';

import {NavController} from 'ionic-angular';

import {TabsPage} from '../tabs/tabs';
import {UserData} from '../../providers/user-data';
import {GlobalService} from'../../providers/global-service';
import {Setting} from'../../providers/setting';
import {RoadmapPage} from '../roadmap/roadmap';
import {Storage} from '@ionic/storage';
/*
 Generated class for the Settings page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  setting:{enableNotification?:boolean, warningDistance?:number} = {};
  submitted = true;

  constructor(public navCtrl:NavController, public settingProvider:Setting, public userData:UserData, public globalService:GlobalService) {
    settingProvider.getEnableNotification().then((data:any)=> {
      this.setting.enableNotification = data;
      if(data < 0 || data == null)
        this.setting.enableNotification = true;
    });
    settingProvider.getWarningDistance().then((data:any)=> {
      this.setting.warningDistance = data;
      if(data < 0 || data == null) {
        this.setting.warningDistance = 1000;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  onSave(form:NgForm) {
    this.submitted = true;

    this.settingProvider.setEnableNotification(this.setting.enableNotification);
    this.settingProvider.setWarningDistance(this.setting.warningDistance);

    /*let buttons:any = [
     {
     text: 'Cancel', role: 'cancel',
     handler: (data:any) => {
     }
     }, {
     text: 'Continue',
     handler: (data:any) => {
     }
     }
     ];*/

    this.globalService.alert("Success!", "Setting saved!", "Notification will now validate according to new settings.").present();
    this.navCtrl.setRoot(TabsPage);
  }

  onCancel() {
    this.navCtrl.setRoot(TabsPage);
  }

}
