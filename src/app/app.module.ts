import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';

import {AppComponent} from './app.component';
import { BackendService } from './Shared/backend.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, InMemoryWebApiModule.forRoot(BackendService),
  ],
  providers: [],
  bootstrap: [AppComponent]
})


export class AppModule {
}
