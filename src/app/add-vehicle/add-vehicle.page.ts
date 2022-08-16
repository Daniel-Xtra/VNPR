/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable eqeqeq */

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Vehicle } from 'src/models/vehicle';
import { VehicleProvider } from 'src/providers/vehicle/vehicle';
import { Helpers } from '../app.helpers';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.page.html',
  styleUrls: ['./add-vehicle.page.scss'],
})
export class AddVehiclePage {
  States = [
    'Abia',
    'Adamawa',
    'Akwa Ibom',
    'Anambra',
    'Bauchi',
    'Bayelsa',
    'Benue',
    'Borno',
    'Cross River',
    'Delta',
    'Ebonyi',
    'Edo',
    'Ekiti',
    'Enugu',
    'Gombe',
    'Imo',
    'Jigawa',
    'Kaduna',
    'Kano',
    'Kastina',
    'Kebbi',
    'Kogi',
    'Kwara',
    'Lagos',
    'Nassarawa',
    'Niger',
    'Ogun',
    'Ondo',
    'Osun',
    'Oyo',
    'Plateau',
    'Rivers',
    'Sokoto',
    'Taraba',
    'Yobe',
    'Zamfara',
  ];

  first: boolean = false;
  second: boolean = false;
  third: boolean = false;

  addVehForm: FormGroup;

  constructor(
    private _helpers: Helpers,
    private formBuilder: FormBuilder,
    private vech: VehicleProvider
  ) {
    this.initializeForms();
  }

  initializeForms() {
    this.addVehForm = this.formBuilder.group({
      address: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone_number: [
        null,
        [Validators.required, Validators.pattern(new RegExp(/^[0-9]{3,16}$/))],
      ],
      name: [null, [Validators.required]],
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      plate_number: [null, [Validators.required]],
      title: [null, [Validators.required]],
      color: [null, [Validators.required]],

      fuel_type: [null, [Validators.required]],
      chassis_no: [null, [Validators.required]],
      engine_capacity: [null, [Validators.required]],
      tank_capacity: [null, [Validators.required]],
      owner_identification: [null, [Validators.required]],
      identification_no: [null, [Validators.required]],
      category: [null, [Validators.required]],
      vehicle_type: [null, [Validators.required]],
      driver_license_no: [null, [Validators.required]],
      license_bearer_name: [null, [Validators.required]],
      state_of_plateNo_allocation: [null, [Validators.required]],
    });
  }
  vehReg() {
    // let verified: any;

    if (this.addVehForm.value) {
      this._helpers.createLoader('please wait..');
      const reg_obj: Vehicle = {
        email: this.addVehForm.value.email,
        phone_number: this.addVehForm.value.phone_number,
        gender: this.addVehForm.value.gender,
        name: this.addVehForm.value.name,
        first_name: this.addVehForm.value.first_name,
        last_name: this.addVehForm.value.last_name,
        plate_number: this.addVehForm.value.plate_number,
        color: this.addVehForm.value.color,
        fuel_type: this.addVehForm.value.fuel_type,
        vehicle_type: this.addVehForm.value.vehicle_type,
        chassis_no: this.addVehForm.value.chassis_no,
        engine_capacity: this.addVehForm.value.engine_capacity,
        tank_capacity: this.addVehForm.value.tank_capacity,
        category: this.addVehForm.value.category,
        owner_identification: this.addVehForm.value.owner_identification,
        identification_no: this.addVehForm.value.identification_no,
        driver_license_no: this.addVehForm.value.driver_license_no,
        license_bearer_name: this.addVehForm.value.license_bearer_name,
        state_of_plateNo_allocation:
          this.addVehForm.value.state_of_plateNo_allocation,
        title: this.addVehForm.value.title,
        address: this.addVehForm.value.address,
      };

      console.log(reg_obj);
      this.vech.addVehicle(reg_obj).subscribe(
        async (res) => {
          await this._helpers.dismissLoader();
          this.addVehForm.reset();
          console.log(res);
          this._helpers.showToast('Vehicle Added!');
        },
        (err) => {
          this._helpers.dismissLoader();
          // this._helpers.showErrorToast(
          //   !err.message
          //     ? 'Could not register now. Please try again..'
          //     : err.message
          // );
          console.log('error is', err);
        }
      );
    } else {
      this._helpers.dismissLoader();
      this._helpers.showToast('Please,fill all the fields required..');
    }
  }

  toggle() {
    this.first = !this.first;
    this.second = false;
    this.third = false;
  }

  viewing() {
    this.second = !this.second;
    this.first = false;
    this.third = false;
  }

  showing() {
    this.third = !this.third;
    this.first = false;
    this.second = false;
  }
}
