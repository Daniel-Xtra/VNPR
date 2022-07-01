import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddVehiclePageRoutingModule } from './add-vehicle-routing.module';

import { AddVehiclePage } from './add-vehicle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddVehiclePageRoutingModule
  ],
  declarations: [AddVehiclePage]
})
export class AddVehiclePageModule {}
