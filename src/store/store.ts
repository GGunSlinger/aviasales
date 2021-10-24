import { observable, reaction } from "mobx";
import { Ticket } from "models/tickets";
import {
  FILTER_TRANSFERS_ALL,
  SORTING_TICKETS_BY_CHEAPEST,
  SORTING_TICKETS_BY_FASTEST,
  SORTING_TICKETS_OPTIMAL,
} from "models/filter";

export const Filter = observable<string>([]);

export const Sorts = observable.box();

export const Tickets = observable<Ticket>([]);

export const FilteredTickets = observable<Ticket>([]);

const filterTickets = (tickets: Ticket[], filter: string[]) => {
  const isSelectedAll = filter.includes(FILTER_TRANSFERS_ALL) || !filter.length;

  return tickets.filter(({ segments }) => {
    const firstStop = segments[0].stops.length;
    const secondStop = segments[1].stops.length;
    const isStopsCorrect =
      filter.includes(firstStop.toString()) &&
      filter.includes(secondStop.toString());

    return isSelectedAll || isStopsCorrect;
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

  if (sortType === SORTING_TICKETS_OPTIMAL) {
    return tickets.sort((a, b) => {
      const firstTicketDuration =
        a.segments[0].duration + a.segments[1].duration;
      const secondTicketDuration =
        b.segments[0].duration + b.segments[1].duration;

      const roundedFirstPrice = Math.floor(+(a.price / 10000).toFixed(1));
      const roundedSecondPrice = Math.floor(+(b.price / 10000).toFixed(1));

      return (
        roundedFirstPrice - roundedSecondPrice ||
        firstTicketDuration - secondTicketDuration
      );
    });
  }

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
