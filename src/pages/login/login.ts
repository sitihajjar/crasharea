import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
import { UserData } from '../../providers/user-data';
import { GlobalService } from'../../providers/global-service';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: {username?: string, password?: string} = {};
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData, public globalService:GlobalService) { }

 onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.globalService.login(this.login).subscribe((data:any)=>{
        alert("Hi " + data.name);
        this.userData.setId(data.id);
        this.userData.login(data);
        this.navCtrl.push(TabsPage);
      }, (error:any)=>{

      });
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
}
