import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyaccPage } from './myacc.page';

const routes: Routes = [
  {
    path: '',
    component: MyaccPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyaccPageRoutingModule {}
