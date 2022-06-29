/* eslint-disable @typescript-eslint/naming-convention */
export interface User {
  id: number;
  username: string;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  membership_type: 'user' | 'admin';
  verified: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  isOnline?: boolean;
  sessionStatus?: string;

  profile: Profile;
}

export interface Profile {
  relationship_status: any;
  highest_education: any;
  current_education: any;
  occupation: any;
  id: number;
  interest: any;
  marital_status: any;
  profile_picture_url: string;
  bio: string;
  location: string;
  facebook_url: string;
  twitter_url: string;
  instagram_url: string;
  snapchat_id: string;
}

export interface Subscription {
  expires: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  userId: number;
  isSubActive: boolean;
}
