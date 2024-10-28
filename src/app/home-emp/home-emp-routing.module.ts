import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeEmpPage } from './home-emp.page';

const routes: Routes = [
  {
    path: '',
    component: HomeEmpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeEmpPageRoutingModule {}
