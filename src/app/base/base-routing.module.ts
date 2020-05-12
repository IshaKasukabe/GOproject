import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotificationComponent} from './notification/notification.component';
import {BaseComponent} from './base.component';
import {MainPageComponent} from './mainpage/mainpage.component';
import {NotificationEditingComponent} from './notification-editing/notification-editing.component';
import {ProfileComponent} from './profile/profile.component';
import {ProfileEditingComponent} from './profile-editing/profile-editing.component';
import {ProfilesPageComponent} from './profiles-page/profiles-page.component';



const routes: Routes = [
  {path: 'base', component: BaseComponent, children: [
      {path: 'mainpage', component: MainPageComponent},
      {path: 'notification', component: NotificationComponent},
      {path: 'notification-editing', component: NotificationEditingComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'profile-editing', component: ProfileEditingComponent},
      {path: 'profiles-page', component: ProfilesPageComponent}   ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
