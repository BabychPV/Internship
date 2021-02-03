import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {
  AuthorDetailsComponent,
  AuthorEditComponent,
  AuthorListComponent,
  DictionaryHomeComponent,
  GenreEditComponent,
  GenreListComponent,
  LoginComponent
} from './index';

import {DictionaryRoutingModule} from './Dictionary.routing';
import {BackendService} from './Shared/backend.service';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [DictionaryHomeComponent,
    AuthorListComponent,
    AuthorDetailsComponent,
    AuthorEditComponent,
    LoginComponent,
    GenreEditComponent,
    GenreListComponent],
  exports: [
    DictionaryHomeComponent
  ],
  imports: [
    CommonModule,
    DictionaryRoutingModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(BackendService),
    FormsModule,
    ReactiveFormsModule
  ]
})

export class DictionaryModules {
}
