import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent, ProductDetailsComponent, ProductHomeComponent, ProductListComponent} from './index';
import { AuthGuardService } from './Shared/auth.guard.service';

export const routes: Routes =
  [
    {path: '', redirectTo: 'HomeWork-05', pathMatch: 'full'},
    {path: 'HomeWork-05', component: ProductHomeComponent},
    {
      path: 'Product page detail', component: ProductHomeComponent,
      children: [
        {
          path: '', component: ProductListComponent,
          canActivate: [AuthGuardService]
        },
        {
          path: ':id', component: ProductDetailsComponent,
          canDeactivate: [AuthGuardService]
        }
      ]
    }, {
    path: 'Product PopUp detail', component: ProductHomeComponent,
    children: [
      {
        path: '', component: ProductListComponent,
        canActivateChild: [AuthGuardService],
        children: [{
          path: ':id', component: ProductDetailsComponent,
          canDeactivate: [AuthGuardService]
        }]
      }
    ]
  },
    {
      path: 'Login', component: ProductHomeComponent,
      children: [
        {path: '', component: LoginComponent}
      ]
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class Les5RoutingModule {
}
