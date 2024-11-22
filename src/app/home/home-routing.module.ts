import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'envio/:id',
    loadChildren: () => import('./envio/envio.module').then(m => m.EnvioPageModule)
  },
  {
    path: 'shipment',
    loadChildren: () => import('../shipment/shipment.module').then(m => m.ShipmentPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
