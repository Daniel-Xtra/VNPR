/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { base_url } from '../config/config';
import { Headers, RequestOptions, Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UserdataProvider {
  constructor(
    public http: Http,
    public httpclnt: HttpClient,
    public storage: Storage
  ) {
    console.log('Hello UserdataProvider Provider');
  }
  public setUserStorage(key: string, userdata: any): Promise<any> {
    return this.storage.set(key, userdata);
  }
  public getUserStorage(key: string): Promise<any> {
    return this.storage.get(key);
  }
  public getUser(user_id) {
    return new Promise((resolve) => {
      this.httpclnt
        .get(
          base_url +
            'get_useerdetails?key=c25c1711f3e962dbf731ef178c910208139' +
            '&user_id=' +
            user_id
        )
        .subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            console.log(err);
          }
        );
    });
  }
  /**
   * get_userSubscription
   */
  public get_userSubscription(user_id) {
    return new Promise((resolve) => {
      this.httpclnt
        .get(
          base_url +
            'check_user_subscription?key=c25c1711f3e962dbf731ef178c910208139' +
            '&user_id=' +
            user_id
        )
        .subscribe(
          (data) => {
            resolve(data);
          },
          (err) => {
            console.log(err);
          }
        );
    });
  }
  public get_profile(user_id) {
    return this.http
      .get(
        base_url +
          'get_profile?key=c25c1711f3e962dbf731ef178c910208139' +
          '&userid=' +
          user_id
      )
      .map((res) => res.json());
  }
  public get_biodata(user_id) {
    return this.http
      .get(
        base_url +
          'getbiodata?key=c25c1711f3e962dbf731ef178c910208139' +
          '&userid=' +
          user_id
      )
      .map((res) => res.json());
  }
  public updateUserPhoto(profiledata) {
    let headers = new Headers();
    headers.append(
      'Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(
        base_url + 'updateUserPhoto?key=c25c1711f3e962dbf731ef178c910208139',
        profiledata,
        options
      )
      .map((res) => res.json());
  }
  /**
   * update_Userprofile
   */
  public update_Userprofile(userdata) {
    let headers = new Headers();
    headers.append(
      'Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(
        base_url + 'update_profile?key=c25c1711f3e962dbf731ef178c910208139',
        userdata,
        options
      )
      .map((res) => res.json());
  }
  update_player_id(push_data) {
    return this.http
      .get(
        base_url +
          'add_user_push_id?key=c25c1711f3e962dbf731ef178c910208139' +
          '&user_id=' +
          push_data.user_id +
          '&player_id=' +
          push_data.player_id
      )
      .map((res) => res.json());
  }
  /**
   * update_userBiodata
   */
  public update_userBiodata(userdata) {
    let headers = new Headers();
    headers.append(
      'Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );
    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(
        base_url + 'submit_biodata_ios?key=c25c1711f3e962dbf731ef178c910208139',
        userdata,
        options
      )
      .map((res) => res.json());
  }
  public get_all_user_topics(user_id, page) {
    console.log(page);
    return this.http
      .get(
        base_url +
          'all_user_topics?key=c25c1711f3e962dbf731ef178c910208139' +
          '&page=' +
          page +
          '&user_id=' +
          user_id
      )
      .map((res) => res.json());
  }
  public get_all_user_replies(user_id, page) {
    return this.http
      .get(
        base_url +
          'get_user_replies?key=c25c1711f3e962dbf731ef178c910208139' +
          '&user_id=' +
          user_id +
          '&page=' +
          page
      )
      .map((res) => res.json());
  }
  public get_userSubtype(user_id) {
    return this.http
      .get(
        base_url +
          'get_userSubtype?key=c25c1711f3e962dbf731ef178c910208139' +
          '&user_id=' +
          user_id
      )
      .map((res) => res.json());
  }
  public end_userSub(user_id) {
    return this.http
      .get(
        base_url +
          'end_userSub?key=c25c1711f3e962dbf731ef178c910208139' +
          '&user_id=' +
          user_id
      )
      .map((res) => res.json());
  }
}
