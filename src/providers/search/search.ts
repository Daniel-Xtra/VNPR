/* eslint-disable @typescript-eslint/quotes */
import { BaseProvider } from './../base/base';
import { Injectable } from '@angular/core';

/*
  Generated class for the SearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchProvider {
  private actionUrl = '/search';
  constructor(private api: BaseProvider) {}

  search(filter: 'posts' | 'users' | 'blog', query: string) {
    this.api.setActionUrl(this.actionUrl, `?f=${filter}&q=${query}`);
    return this.api.get();
  }
}
