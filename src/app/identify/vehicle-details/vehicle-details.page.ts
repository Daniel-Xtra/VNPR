import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.page.html',
  styleUrls: ['./vehicle-details.page.scss'],
})
export class VehicleDetailsPage {
  seeMore = true;
  constructor() {}

  switch() {
    this.seeMore = !this.seeMore;
  }
}
