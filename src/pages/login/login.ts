import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';
import { GlobalService } from'../../providers/global-service';
import { RoadmapPage } from '../roadmap/roadmap';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = true;

  constructor(public navCtrl: NavController, public userData: UserData, public globalService:GlobalService) { }

 onLogin(form: NgForm) {
  this.submitted = true;

  if (form.valid) {
    this.globalService.login(this.login).subscribe((data:any)=>{
      if(data.hasOwnProperty('username')){
        alert(" Welcome " + data.username + ". Successfully logged in to Crash Area Alert Apps. Click OK to Continue.");
        //this.userData.setId(data.id);
        this.userData.login(data);
        this.navCtrl.push(RoadmapPage);
      }else
        alert("Ralat! Sila masukkan semula data.");
     },
     (error:any)=>{

    });
  }
}

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
