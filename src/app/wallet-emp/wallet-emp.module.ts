import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletEmpPageRoutingModule } from './wallet-emp-routing.module';

import { WalletEmpPage } from './wallet-emp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletEmpPageRoutingModule
  ],
  declarations: [WalletEmpPage]
})
export class WalletEmpPageModule {}
