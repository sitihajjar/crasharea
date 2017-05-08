import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import{RoadmapPage} from '../roadmap/roadmap';
import { MenuController, Slides } from 'ionic-angular';

/*
  Generated class for the Info page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {
  showSkip = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }

 onSkip() {
    this.navCtrl.push(RoadmapPage).then(() => {
      //this.storage.set('hasSeenTutorial', 'true');
    })
  }
  onschange(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
