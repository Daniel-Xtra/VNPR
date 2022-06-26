import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddOfficialPage } from './add-official.page';

const routes: Routes = [
  {
    path: '',
    component: AddOfficialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddOfficialPageRoutingModule {}
