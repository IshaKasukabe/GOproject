import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NotificationCardComponent } from './cards/notification-card/notification-card.component';
import { UserCardComponent } from './cards/user-card/user-card.component';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';
import {BsDatepickerModule, DatepickerModule} from "ngx-bootstrap/datepicker";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BsDropdownDirective, BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TypeaheadModule} from "ngx-bootstrap/typeahead";
import {ModalModule} from "ngx-bootstrap/modal";
import {PopoverModule} from "ngx-bootstrap/popover";

@NgModule({
  imports:
    [ ReactiveFormsModule,
      FormsModule,
      TimepickerModule.forRoot(),
      BsDatepickerModule.forRoot(),
      BrowserAnimationsModule,
      DatepickerModule,
      BsDropdownModule.forRoot(),
      TypeaheadModule.forRoot(),
      ModalModule.forRoot(),
      PopoverModule.forRoot()
 ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    NotificationCardComponent,
    TimepickerModule,
    BsDatepickerModule,
    BrowserAnimationsModule,
    DatepickerModule,
    BsDropdownModule,
    TypeaheadModule,
    ModalModule,
    PopoverModule],
  declarations: [NotificationCardComponent, UserCardComponent],
})

export class SharedModule {

}
