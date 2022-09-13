import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeReportPage } from './make-report.page';

const routes: Routes = [
  {
    path: '',
    component: MakeReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeReportPageRoutingModule {}
