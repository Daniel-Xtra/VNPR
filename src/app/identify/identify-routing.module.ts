import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentifyPage } from './identify.page';

const routes: Routes = [
  {
    path: '',
    component: IdentifyPage
  },
  {
    path: 'vehicle-details',
    loadChildren: () => import('./vehicle-details/vehicle-details.module').then( m => m.VehicleDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentifyPageRoutingModule {}
