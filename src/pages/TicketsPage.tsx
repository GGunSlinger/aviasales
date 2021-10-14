import { ticketsAPI } from "api/ticketsApi";
import React, { useEffect, useState } from "react";
import TicketsContent from "./TicketsContent";
import Styles from "./TicketsPage.module.scss";
import { observer } from "mobx-react-lite";
import { FilteredTickets, Tickets } from "store/store";

const TicketsPage: React.FC = observer(() => {
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await ticketsAPI.getSearchId();
      const ticketsData = await ticketsAPI.getTickets(data.searchId);

      Tickets.push(...ticketsData.data.tickets);
      FilteredTickets.push(...ticketsData.data.tickets);
    } catch (e) {
      console.error(e);
      // TODO обработать ошибку
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className={Styles.ticketPageWrap}>
      <TicketsContent />
    </div>
  );
});

export default TicketsPage;
