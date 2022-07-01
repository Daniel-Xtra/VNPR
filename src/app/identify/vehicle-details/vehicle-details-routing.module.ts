import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleDetailsPage } from './vehicle-details.page';

const routes: Routes = [
  {
    path: '',
    component: VehicleDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehicleDetailsPageRoutingModule {}
