import { OrderType, StreamType } from "@/types";

export const ORDER_TYPE_LABELS = {
  [OrderType.PICKUP]: "Pick up",
  [OrderType.DROP_OFF]: "Drop off",
};

export const STREAM_TYPE_LABELS = {
  [StreamType.ORANGE_PEELS]: "Orange peels",
  [StreamType.COFFEE_WASTE]: "Coffee waste",
};

export const ISSUE_TYPES = [
  { id: 1, label: "Wrong quanity ordered" },
  { id: 2, label: "Wrong container type" },
  { id: 3, label: "Container is not accessible" },
  { id: 0, label: "Other issue" },
];

export const ISSUE_ID_TO_LABEL = ISSUE_TYPES.reduce<{ [key: string]: string }>(
  (acc, issue) => {
    acc[issue.id] = issue.label;

    return acc;
  },
  {}
);
