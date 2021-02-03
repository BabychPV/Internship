import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  AuthorDetailsComponent,
  AuthorEditComponent,
  AuthorListComponent,
  GenreEditComponent,
  GenreListComponent,
  LoginComponent
} from './index';
import {AuthGuardService} from './Shared/auth.guard.service';

export const routes: Routes =
  [
    {path: '', redirectTo: 'Authors', pathMatch: 'full'},
    {path: 'Authors', component: AuthorListComponent},
    {
      path: 'Authors/Detail/:id', component: AuthorDetailsComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: 'Authors/Edit/:id', component: AuthorEditComponent,
      canDeactivate: [AuthGuardService], canActivate: [AuthGuardService]
    }
    ,
    {
      path: 'Authors/Edit', component: AuthorEditComponent,
      canDeactivate: [AuthGuardService], canActivate: [AuthGuardService]
    },
    {path: 'Genres', component: GenreListComponent},
    {
      path: 'Genres/Detail/:id', component: GenreEditComponent,
      canActivate: [AuthGuardService]
    },
    {
      path: 'Genres/Edit/:id', component: GenreEditComponent,
      canDeactivate: [AuthGuardService], canActivate: [AuthGuardService]
    }
    ,
    {
      path: 'Genres/Edit', component: GenreEditComponent,
      canDeactivate: [AuthGuardService], canActivate: [AuthGuardService]
    }
    ,
    {path: 'Login', component: LoginComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DictionaryRoutingModule {
}
