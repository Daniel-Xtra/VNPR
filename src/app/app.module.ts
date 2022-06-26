/* eslint-disable @typescript-eslint/quotes */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Helpers } from './app.helpers';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ animated: false }),

    IonicStorageModule.forRoot({
      name: '__vnpri',
      storeName: 'vnpri',
      driverOrder: ['sqlite', 'indexeddb', 'websql'],
    }),
    AppRoutingModule,
  ],
  providers: [
    Helpers,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
