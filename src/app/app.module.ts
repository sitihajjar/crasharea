import {NgModule} from '@angular/core';

import {IonicApp, IonicModule} from 'ionic-angular';
import {Storage} from '@ionic/storage';

import {ConferenceApp} from './app.component';

import {HomePage} from '../pages/home/home';
import {AboutPage} from '../pages/about/about';
import {PopoverPage} from '../pages/about-popover/about-popover';
//import {AccountPage} from '../pages/account/account';
import {LoginPage} from '../pages/login/login';
import {MapPage} from '../pages/map/map';
//import {SchedulePage} from '../pages/schedule/schedule';
//import {ScheduleFilterPage} from '../pages/schedule-filter/schedule-filter';
//import {SessionDetailPage} from '../pages/session-detail/session-detail';
import {SignupPage} from '../pages/signup/signup';
import {SpeakerDetailPage} from '../pages/speaker-detail/speaker-detail';
import {SpeakerListPage} from '../pages/speaker-list/speaker-list';
import {TabsPage} from '../pages/tabs/tabs';
import {TutorialPage} from '../pages/tutorial/tutorial';
//import {SupportPage} from '../pages/support/support';
import {RoadmapPage} from '../pages/roadmap/roadmap';
import {InfoPage} from '../pages/info/info';

import {GlobalService} from '../providers/global-service';
import {LocationTracker} from '../providers/location-tracker';
import {ConferenceData} from '../providers/conference-data';
import {UserData} from '../providers/user-data';
import {LocalNotifications} from '@ionic-native/local-notifications';


@NgModule({
  declarations: [
    ConferenceApp,
    HomePage,
    AboutPage,
    //AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    //SchedulePage,
   // ScheduleFilterPage,
    //SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
   //SupportPage,
    RoadmapPage,
    InfoPage,
  ],
  imports: [
    IonicModule.forRoot(ConferenceApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    HomePage,
    AboutPage,
    //AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    //SchedulePage,
    //ScheduleFilterPage,
    //SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    //SupportPage,
    RoadmapPage,
    InfoPage
  ],
  providers: [ConferenceData, UserData, Storage, GlobalService, LocationTracker, LocalNotifications]
})
export class AppModule {
}
