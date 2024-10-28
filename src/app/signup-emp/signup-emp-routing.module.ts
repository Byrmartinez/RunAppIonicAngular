import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupEmpPage } from './signup-emp.page';

const routes: Routes = [
  {
    path: '',
    component: SignupEmpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupEmpPageRoutingModule {}
