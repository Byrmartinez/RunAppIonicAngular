import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupRiderPageRoutingModule } from './signup-rider-routing.module';

import { SignupRiderPage } from './signup-rider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupRiderPageRoutingModule
  ],
  declarations: [SignupRiderPage]
})
export class SignupRiderPageModule {}
