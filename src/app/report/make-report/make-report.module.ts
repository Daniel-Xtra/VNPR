import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakeReportPageRoutingModule } from './make-report-routing.module';

import { MakeReportPage } from './make-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MakeReportPageRoutingModule,
  ],
  declarations: [MakeReportPage],
})
export class MakeReportPageModule {}
