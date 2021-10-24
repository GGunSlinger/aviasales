import { pluralize } from "utils/ticketUtils";

export const FILTER_TRANSFERS_ALL = "all";
export const FILTER_TRANSFERS_NONE = "0";
export const FILTER_TRANSFERS_ONE = "1";
export const FILTER_TRANSFERS_TWO = "2";
export const FILTER_TRANSFERS_THREE = "3";

export const FILTER_TRANSFERS_ALL_OPTIONS = [
  FILTER_TRANSFERS_ALL,
  FILTER_TRANSFERS_NONE,
  FILTER_TRANSFERS_ONE,
  FILTER_TRANSFERS_TWO,
  FILTER_TRANSFERS_THREE,
];

export const SORTING_TICKETS_BY_CHEAPEST = "cheapest";
export const SORTING_TICKETS_BY_FASTEST = "fastest";
export const SORTING_TICKETS_OPTIMAL = "optimal";

export const getFilterLabel = (filterOption: string): string => {
  switch (true) {
    case filterOption === FILTER_TRANSFERS_ALL: {
      return "все";
    }
    case filterOption === FILTER_TRANSFERS_NONE: {
      return "без пересадок";
    }
    default: {
      return pluralize(+filterOption, ["пересадка", "пересадки"]);
    }
  }
};
