import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import { DictionaryModules } from './Dictionary/Dictionary.module';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DictionaryModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
