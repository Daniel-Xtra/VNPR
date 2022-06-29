/* eslint-disable @typescript-eslint/quotes */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Helpers } from './app.helpers';
import { HeaderInterceptor } from 'src/interceptors/header-interceptor';
import { RequestInterceptor } from 'src/interceptors/request-interceptor';
import { AuthProvider } from 'src/providers/auth/auth';
import { BaseProvider } from 'src/providers/base/base';
import { VehicleProvider } from 'src/providers/vehicle/vehicle';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot({
      animated: false,
      scrollPadding: false,
      scrollAssist: true,
    }),

    IonicStorageModule.forRoot({
      name: '__vnpri',
      // storeName: 'vnpri',
      // driverOrder: ['sqlite', 'indexeddb', 'websql'],
    }),
    AppRoutingModule,
  ],
  providers: [
    Helpers,
    AuthProvider,
    BaseProvider,
    VehicleProvider,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
