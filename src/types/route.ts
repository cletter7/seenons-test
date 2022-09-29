import type { Status } from "./common";
import type { Address } from "./address";
import type { Order } from "./order";

export interface RouteStop {
  stop_id: number;
  status: Status;
  name: string;
  comment: string | null;
  avatar: string | null;
  telephone: string | null;
  address: Address;
  eta: string;
  time_start: string;
  time_end: string;
  orders: Order[];
}

export interface Route {
  name: string;
  status: Status;
  stops: RouteStop[];
}
