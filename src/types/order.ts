import type { Status } from "./common";

export enum StreamType {
  ORANGE_PEELS = "sinaasappelschillen",
  COFFEE_WASTE = "koffiedrab",
}

export enum OrderType {
  PICKUP = 0,
  DROP_OFF = 1,
}

export interface Order {
  order_id: string;
  stream_product_id: number;
  stream_type: StreamType;
  quantity: number;
  size: number;
  status: Status;
  type: OrderType;
  issues?: number[];
}
