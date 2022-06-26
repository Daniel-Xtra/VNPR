import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdentifyPageRoutingModule } from './identify-routing.module';

import { IdentifyPage } from './identify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdentifyPageRoutingModule
  ],
  declarations: [IdentifyPage]
})
export class IdentifyPageModule {}
