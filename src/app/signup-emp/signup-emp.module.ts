import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupEmpPageRoutingModule } from './signup-emp-routing.module';

import { SignupEmpPage } from './signup-emp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupEmpPageRoutingModule
  ],
  declarations: [SignupEmpPage]
})
export class SignupEmpPageModule {}
