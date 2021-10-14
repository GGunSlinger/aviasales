import { observable, reaction } from "mobx";
import { Ticket } from "models/tickets";
import {
  FILTER_TRANSFERS_ALL,
  SORTING_TICKETS_BY_CHEAPEST,
  SORTING_TICKETS_BY_FASTEST,
} from "models/filter";

export const Filter = observable<string>([]);

export const Sorts = observable.box(SORTING_TICKETS_BY_CHEAPEST);

export const Tickets = observable<Ticket>([]);

export const FilteredTickets = observable<Ticket>([]);

const filterTickets = (tickets: Ticket[], filter: string[]) => {
  const isSelectedAll = filter.includes(FILTER_TRANSFERS_ALL) || !filter.length;

  return tickets.filter(({ segments }) => {
    const totalStops = segments[0].stops.length + segments[1].stops.length;

    return isSelectedAll || filter.includes(totalStops.toString());
  });
};

const sortingTickets = (tickets: Ticket[], sortType: string) => {
  if (sortType === SORTING_TICKETS_BY_CHEAPEST) {
    return tickets.sort((a, b) => a.price - b.price);
  }

  if (sortType === SORTING_TICKETS_BY_FASTEST) {
    return tickets.sort((a, b) => {
      const firstTicketDuration =
        a.segments[0].duration + a.segments[1].duration;
      const secondTicketDuration =
        b.segments[0].duration + b.segments[1].duration;

      return firstTicketDuration - secondTicketDuration;
    });
  }

  // TODO SORTING_TICKETS_OPTIMAL

  return tickets;
};

reaction(
  () => Filter.length,
  () => {
    const filtered = filterTickets(Tickets, Filter);
    const sorted = sortingTickets(filtered, Sorts.get());
    FilteredTickets.replace(sorted);
  }
);

reaction(
  () => Sorts.get(),
  () => {
    sortingTickets(FilteredTickets, Sorts.get());
  }
);
