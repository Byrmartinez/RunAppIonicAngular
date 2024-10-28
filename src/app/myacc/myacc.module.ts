import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyaccPageRoutingModule } from './myacc-routing.module';

import { MyaccPage } from './myacc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyaccPageRoutingModule
  ],
  declarations: [MyaccPage]
})
export class MyaccPageModule {}
