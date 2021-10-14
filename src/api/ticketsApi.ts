import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Ticket, SearchId } from "models/tickets";

export const baseURL: AxiosInstance = axios.create({
  baseURL: "https://front-test.beta.aviasales.ru/",
});

type TicketResponse = {
  tickets: Ticket[];
  stop: boolean;
};

export const ticketsAPI = {
  getSearchId(): Promise<AxiosResponse<SearchId>> {
    return baseURL.get<SearchId>("search");
  },
  getTickets(id: string): Promise<AxiosResponse<TicketResponse>> {
    return baseURL.get<TicketResponse>(`tickets?searchId=${id}`);
  },
};
