/* eslint-disable @angular-eslint/contextual-lifecycle */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable id-blacklist */
/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/quotes */
import { Storage } from '@ionic/storage';
import { Injectable, OnInit } from '@angular/core';
import {
  ModalController,
  ModalOptions,
  LoadingController,
  Platform,
  ActionSheetOptions,
  ActionSheetController,
  AlertController,
  ToastController,
} from '@ionic/angular';

// import { LoadingBarService } from '@ngx-loading-bar/core';
import { StorageKey } from './app.enums';
// import { AlertInputOptions } from 'ionic-angular/umd/components/alert/alert-options';
// import { User } from '../models/user';
import { EventsType } from './app.enums';

@Injectable()
export class Helpers {
  stopProgressBar() {
    throw new Error('Method not implemented.');
  }
  isSubscribedToNavEvents: boolean;
  activePageIcon: string;
  loading;
  registerBackButton: any;
  constructor(
    // private events: Events,
    private actionSheetCtrl: ActionSheetController,
    // private _loader: LoadingBarService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,

    private platform: Platform,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private modalCtrl: ModalController
  ) {
    this.storage.create();
  }

  // async ngOnInit() {
  //   await this.storage.create();
  // }

  removeFromDB(key: StorageKey) {
    return this.storage.remove(key);
  }
  // getUser(): Promise<User> {
  //   return this.storage.get(StorageKey.user);
  // }

  get<T = any>(key: any): Promise<T> {
    return this.storage.get(key);
  }

  clearDb() {
    return this.storage.clear();
  }

  store(key: any, value: any) {
    return this.storage.set(key, value);
  }

  createActionsheet(options: ActionSheetOptions) {
    return this.actionSheetCtrl.create(options);
  }

  handleBackButton(customHandler: Function = () => {}) {
    return this.platform.backButton.subscribeWithPriority(5, () => {});
  }

  createModal(
    component: string,
    data: any = null,
    options: ModalOptions = {
      component: '',
    }
  ) {
    return this.modalCtrl.create(data);
  }

  async createLoader(message, cssClass = '') {
    this.registerBackButton = this.handleBackButton();
    this.loading = await this.loadingCtrl.create({
      message,
      cssClass,
    });
    await this.loading.present();

    // this.loading.didLeave.subscribe(() => this.registerBackButton());
    // return this.loading;
  }

  dismissLoader() {
    if (this.loading) {
      this.loading.dismiss();
    }
    // if (this.loading) {
    //   return this.loading.dismiss().then(() => {
    //     this.loading = null as Loading;
    //   });
    // }
  }

  // wait(ms) {
  //   var start = new Date().getTime();
  //   var end = start;
  //   while (end < start + ms) {
  //     end = new Date().getTime();
  //   }
  // }

  async createAlert(message: string, buttonText: string = 'OK') {
    const alert = await this.alertCtrl.create({
      message,

      buttons: [
        {
          text: buttonText,
        },
      ],
    });
    await alert.present();
  }

  async createAlertWithHandlers(
    message = '',
    buttons: Array<{ handlerFn: Function; text: string }>
  ) {
    const btns = buttons.map((item) => {
      return {
        text: item.text,
        handler: () => item.handlerFn(),
      };
    });

    const alert = await this.alertCtrl.create({
      message,

      buttons: btns,
    });

    await alert.present();
  }

  // createPromptAlert(
  //   message = '',
  //   subTitle = '',
  //   inputs: AlertInputOptions[],
  //   buttons: Array<{ handlerFn: Function; text: string }>,
  //   mode: 'ios' | 'md' | '' = '',
  //   title = ''
  // ) {
  //   const btns = buttons.map((item) => {
  //     return {
  //       text: item.text,
  //       handler: (any: any) => {
  //         return item.handlerFn(any);
  //       },
  //     };
  //   });

  //   return this.alertCtrl.create({
  //     inputs,
  //     message,
  //     buttons: btns,
  //   });
  // }
  async showToast(message: string, duration: number = 3000) {
    const error = await this.toastCtrl.create({
      message,
      duration,
      position: 'bottom',
      animated: true,
      cssClass: 'success-toast',
    });
    await error.present();
  }

  async showErrorToast(message: string, duration: number = 3000) {
    const error = await this.toastCtrl.create({
      message,
      duration,
      position: 'bottom',
      animated: true,
      cssClass: 'error-toast',
    });
    await error.present();
  }

  // publishEvent(event: EventsType, ...args: any[]) {
  //   return this.events.publish(event, ...args);
  // }
}
