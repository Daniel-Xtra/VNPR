import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyCodePageRoutingModule } from './verify-code-routing.module';

import { VerifyCodePage } from './verify-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VerifyCodePageRoutingModule,
  ],
  declarations: [VerifyCodePage],
})
export class VerifyCodePageModule {}
