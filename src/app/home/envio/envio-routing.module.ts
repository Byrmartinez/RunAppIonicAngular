import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { EnvioPage } from './envio.page';

const routes: Routes = [
  {
    path: '',
    component: EnvioPage
  },
  {
    path: 'error',
    loadChildren: () => import('../../error/error.module').then(m => m.ErrorPageModule),
    canActivate: [AuthService]
  },
  {
    path: '**',
    redirectTo: 'error',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnvioPageRoutingModule { }
