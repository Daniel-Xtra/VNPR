/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { ReportProvider } from 'src/providers/report/report';
import { Helpers } from '../app.helpers';

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
  reports;
  profile;
  length;
  user: any;

  constructor(
    private reportP: ReportProvider,
    private _helpers: Helpers,
    private navCtrl: NavController
  ) {
    this.get();
    this.getUserDetails();
  }

  ngOnInit() {
    this.getReports();
  }
  async ionViewWillEnter() {
    await this.get();
  }

  getReports() {
    this.reportP.allReport().subscribe(
      (res: any) => {
        // this._helpers.showToast('Fetched All');
        console.log(res);
        this.length = res.data.length;
        this._helpers.store('reports', res.data);
        // this.get();
        this.reports = res.data;
      },
      (err) => {
        // this._helpers.showErrorToast(err);
      }
    );
  }

  async get() {
    const report = await this._helpers.get('reports');
    this.length = report.length;
    this.reports = report;
  }
  resolve(uniqueId) {
    this.reportP.resolveReport(uniqueId).subscribe(
      (res) => {
        this._helpers.showToast('Resolved');
        this.getReports();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  goToPage() {
    this.navCtrl.navigateForward('report/make-report');
  }

  async getUserDetails() {
    this.user = await this._helpers.getUser();
  }
}
