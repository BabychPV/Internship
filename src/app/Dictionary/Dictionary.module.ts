import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {
  Les5HomeComponent,
  LoginComponent,
  ProductDetailsComponent,
  ProductHomeComponent,
  ProductListComponent
} from './index';
import {Les5RoutingModule} from './Dictionary.routing';
import {BackendService} from './Shared/backend.service';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [Les5HomeComponent, ProductListComponent, ProductDetailsComponent, LoginComponent, ProductHomeComponent],
  imports: [
    CommonModule,
    Les5RoutingModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(BackendService),
    FormsModule
  ]
})

export class DictionaryModules {
}
