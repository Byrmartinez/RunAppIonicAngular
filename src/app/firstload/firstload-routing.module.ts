import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstloadPage } from './firstload.page';

const routes: Routes = [
  {
    path: '',
    component: FirstloadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstloadPageRoutingModule {}
