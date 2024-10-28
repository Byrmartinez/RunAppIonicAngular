import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'myacc',
    loadChildren: () => import('./myacc/myacc.module').then( m => m.MyaccPageModule)
  },
  {
    path: 'indicadores',
    loadChildren: () => import('./indicadores/indicadores.module').then( m => m.IndicadoresPageModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./wallet/wallet.module').then( m => m.WalletPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then( m => m.FAQPageModule)
  },
  {
    path: 'signup-rider',
    loadChildren: () => import('./signup-rider/signup-rider.module').then( m => m.SignupRiderPageModule)
  },
  {
    path: 'signup-emp',
    loadChildren: () => import('./signup-emp/signup-emp.module').then( m => m.SignupEmpPageModule)
  },
  {
    path: 'home-emp',
    loadChildren: () => import('./home-emp/home-emp.module').then( m => m.HomeEmpPageModule)
  },
  {
    path: 'envio',
    loadChildren: () => import('./envio/envio.module').then( m => m.EnvioPageModule)
  },
  {
    path: 'wallet-emp',
    loadChildren: () => import('./wallet-emp/wallet-emp.module').then( m => m.WalletEmpPageModule)
  },
  {
    path: 'renew',
    loadChildren: () => import('./renew/renew.module').then( m => m.RenewPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
