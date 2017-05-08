import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
//import { MapPage } from '../map/map';
import { InfoPage } from '../info/info';
//import { SpeakerListPage } from '../speaker-list/speaker-list';
import {RoadmapPage} from "../roadmap/roadmap";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = InfoPage;
  // tab2Root: any = SpeakerListPage;
  // tab3Root: any = MapPage;
  tab2Root: any = RoadmapPage;
  tab3Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
