import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddVehiclePage } from './add-vehicle.page';

const routes: Routes = [
  {
    path: '',
    component: AddVehiclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddVehiclePageRoutingModule {}
