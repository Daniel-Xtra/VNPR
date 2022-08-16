/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-empty-interface */
export interface Vehicle {
  name: string;
  plate_number: string;
  color: string;
  fuel_type: 'petrol' | 'diesel';
  vehicle_type: 'bus' | 'motorcycle' | 'tricycle' | 'car';
  chassis_no: string;
  engine_capacity:
    | 'above 3.0'
    | 'below 1.6'
    | 'between 1.6 and 2.0'
    | 'between 2.1 and 3.0';
  tank_capacity: string;
  category: 'commercial' | 'government' | 'private';
  owner_identification: string;
  identification_no: string;
  driver_license_no: string;
  license_bearer_name: string;
  state_of_plateNo_allocation: string;
  title: string;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  phone_number: string;
  address: string;
}
