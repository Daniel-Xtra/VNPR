import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddOfficialPageRoutingModule } from './add-official-routing.module';

import { AddOfficialPage } from './add-official.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddOfficialPageRoutingModule,
  ],
  declarations: [AddOfficialPage],
})
export class AddOfficialPageModule {}
