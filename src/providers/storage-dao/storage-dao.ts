/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-console */
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageDaoProvider {
  constructor(private storage: Storage) {
    console.log('Hello StorageDaoProvider Provider');
  }

  // Crud operation

  set(key: string, value): Promise<any> {
    return this.storage
      .set(key, value)
      .then((result) => {
        console.log('set string in storage: ' + result);
        return true;
      })
      .catch(function (reason) {
        console.info(reason);
        return false;
      });
  }

  setObject(key: string, object: Object) {
    return this.storage
      .set(key, JSON.stringify(object))
      .then((result) => {
        console.log('set Object in storage: ' + result);
        return true;
      })
      .catch(function (reason) {
        console.info(reason);
        return false;
      });
  }

  get(key: string): Promise<any> {
    return this.storage
      .get(key)
      .then((result) => {
        console.log('storageGET: ' + key + ': ' + result);
        if (result != null) {
          return result;
        }
        return null;
      })
      .catch(function (reason) {
        console.info(reason);
        return null;
      });
  }

  getObject(key: string): Promise<any> {
    return this.storage
      .get(key)
      .then((result) => {
        if (result != null) {
          return JSON.parse(result);
        }
        return null;
      })
      .catch(function (reason) {
        console.info(reason);
        return null;
      });
  }

  remove(key: string) {
    this.storage.remove(key);
  }

  clear() {
    this.storage.clear();
  }
}
