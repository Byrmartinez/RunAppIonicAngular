import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FirstloadPageRoutingModule } from './firstload-routing.module';
import { FirstloadPage } from './firstload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirstloadPageRoutingModule
  ],
  declarations: [FirstloadPage]
})
export class FirstloadPageModule {}
