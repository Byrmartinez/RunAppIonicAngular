import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupRiderPage } from './signup-rider.page';

const routes: Routes = [
  {
    path: '',
    component: SignupRiderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupRiderPageRoutingModule {}
