import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyCodePageRoutingModule } from './verify-code-routing.module';

import { VerifyCodePage } from './verify-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyCodePageRoutingModule
  ],
  declarations: [VerifyCodePage]
})
export class VerifyCodePageModule {}
