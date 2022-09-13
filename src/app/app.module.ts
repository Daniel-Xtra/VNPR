/* eslint-disable @typescript-eslint/quotes */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Helpers } from './app.helpers';
import { HeaderInterceptor } from 'src/interceptors/header-interceptor';
import { RequestInterceptor } from 'src/interceptors/request-interceptor';
import { AuthProvider } from 'src/providers/auth/auth';
import { BaseProvider } from 'src/providers/base/base';
import { VehicleProvider } from 'src/providers/vehicle/vehicle';
import { ProfileProvider } from 'src/providers/profile/profile';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { ReportProvider } from 'src/providers/report/report';

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
    Camera,
    FileTransfer,
    Helpers,
    NavParams,
    AuthProvider,
    BaseProvider,
    VehicleProvider,
    ProfileProvider,
    ReportProvider,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
