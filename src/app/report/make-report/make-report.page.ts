/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Helpers } from 'src/app/app.helpers';
import { ReportProvider } from 'src/providers/report/report';

@Component({
  selector: 'app-make-report',
  templateUrl: './make-report.page.html',
  styleUrls: ['./make-report.page.scss'],
})
export class MakeReportPage implements OnInit {
  offences = [
    'Assaulting Official On Duty',
    'Dangerous Driving',
    'Unauthorized',
    'Reckeless Driving',
    'Road Obstruction',
  ];
  reportForm: FormGroup;

  constructor(
    private reportP: ReportProvider,
    private _helpers: Helpers,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForms();
  }

  initializeForms() {
    this.reportForm = this.formBuilder.group({
      plate_number: [null, [Validators.required]],
      reason: [null, [Validators.required]],
    });
  }

  report() {
    this.reportP
      .addReport(this.reportForm.value.plate_number, this.reportForm.value)
      .subscribe(
        (res) => {
          this._helpers.showToast('Successful');
        },
        (err) => {
          this._helpers.showErrorToast(err);
        }
      );
  }
  getReports() {
    this.reportP.allReport().subscribe(
      (res) => {
        // this._helpers.showToast('Fetched All');
        console.log(res);

        this._helpers.store('reports', res.data);
      },
      (err) => {
        this._helpers.showErrorToast(err);
      }
    );
  }
}
