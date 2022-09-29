import { defineStore } from "pinia";
import { Status, type Route } from "@/types";

interface RouteState {
  route: Route | null;
}

export const useRouteStore = defineStore("route", {
  state: (): RouteState => ({
    route: null,
  }),
  actions: {
    setRoute(route: Route) {
      this.route = route;
    },

    increaseOrderQuanity(stopId: number, orderId: string) {
      const stop = this.route?.stops.find((stop) => stop.stop_id === stopId);
      const order = stop?.orders.find((order) => order.order_id === orderId);

      if (order) {
        order.quantity++;
      }
    },

    decreaseOrderQuanity(stopId: number, orderId: string) {
      const stop = this.route?.stops.find((stop) => stop.stop_id === stopId);
      const order = stop?.orders.find((order) => order.order_id === orderId);

      if (order && order.quantity > 0) {
        order.quantity--;
      }
    },

    completeOrder(stopId: number, orderId: string) {
      const stop = this.route?.stops.find((stop) => stop.stop_id === stopId);
      const order = stop?.orders.find((order) => order.order_id === orderId);

      if (order) {
        order.status = Status.COMPLETED;
      }
    },

    completeStop(stopId: number) {
      const stop = this.route?.stops.find((stop) => stop.stop_id === stopId);

      if (stop) {
        stop.status = Status.COMPLETED;
      }
    },

    addIssue(stopId: number, orderId: string, issueId: number) {
      const stop = this.route?.stops.find((stop) => stop.stop_id === stopId);
      const order = stop?.orders.find((order) => order.order_id === orderId);

      if (order) {
        if (!order.issues) {
          order.issues = [];
        }

        order.issues.push(issueId);
      }
    },
  },
});
