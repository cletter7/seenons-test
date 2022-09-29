export enum Country {
  NETHERLANDS = "NL",
}

export interface Address {
  house_number: string;
  street: string;
  town: string;
  postal_code: string;
  country: Country;
  lat: number;
  lon: number;
}
