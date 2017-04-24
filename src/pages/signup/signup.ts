import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';
import { GlobalService } from'../../providers/global-service';
import { LoginPage } from "../login/login";


@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  signup: {username?: string, password?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData, public globalService:GlobalService) {}

  onSignup(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
        this.globalService.signup(this.signup).subscribe((data:any)=>{
        alert("Hi " + data.name);
        this.navCtrl.push(LoginPage);
      }, (error:any)=>{

      });

      /*this.userData.signup(this.signup.username);
      this.navCtrl.push(TabsPage);*/
    }
  }
}
