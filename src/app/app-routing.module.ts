import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthService]
  },
  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then(m => m.ErrorPageModule)
  },
  {
    path: 'firstload',
    loadChildren: () => import('./firstload/firstload.module').then(m => m.FirstloadPageModule)
  },
  {
    path: '',
    redirectTo: 'firstload',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'myacc',
    loadChildren: () => import('./myacc/myacc.module').then(m => m.MyaccPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'indicadores',
    loadChildren: () => import('./indicadores/indicadores.module').then(m => m.IndicadoresPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'wallet',
    loadChildren: () => import('./wallet/wallet.module').then(m => m.WalletPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'contacto',
    loadChildren: () => import('./contacto/contacto.module').then(m => m.ContactoPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then(m => m.FAQPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'signup-rider',
    loadChildren: () => import('./signup-rider/signup-rider.module').then(m => m.SignupRiderPageModule)
  },
  {
    path: 'signup-emp',
    loadChildren: () => import('./signup-emp/signup-emp.module').then(m => m.SignupEmpPageModule)
  },
  {
    path: 'home-emp',
    loadChildren: () => import('./home-emp/home-emp.module').then(m => m.HomeEmpPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'envio',
    loadChildren: () => import('./home/envio/envio.module').then(m => m.EnvioPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'wallet-emp',
    loadChildren: () => import('./wallet-emp/wallet-emp.module').then(m => m.WalletEmpPageModule),
    canActivate: [AuthService]
  },
  {
    path: 'renew',
    loadChildren: () => import('./renew/renew.module').then(m => m.RenewPageModule),
    canActivate: [AuthService]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
