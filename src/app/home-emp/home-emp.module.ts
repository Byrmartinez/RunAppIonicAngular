import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeEmpPageRoutingModule } from './home-emp-routing.module';

import { HomeEmpPage } from './home-emp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeEmpPageRoutingModule
  ],
  declarations: [HomeEmpPage]
})
export class HomeEmpPageModule {}
