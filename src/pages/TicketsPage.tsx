import { ticketsAPI } from "api/ticketsApi";
import React, { useEffect, useState } from "react";
import TicketsContent from "./TicketsPageContent";
import Styles from "./TicketsPage.module.scss";
import { observer } from "mobx-react-lite";
import { FilteredTickets, Sorts, Tickets } from "store/store";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import { SORTING_TICKETS_BY_CHEAPEST } from "models/filter";

const TicketsPage: React.FC = observer(() => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    const { data } = await ticketsAPI.getSearchId();
    const resultTickets = [];
    setLoading(true);

    while (true) {
      try {
        const {
          data: { tickets, stop },
        } = await ticketsAPI.getTickets(data.searchId);

        resultTickets.push(...tickets);

        if (stop) {
          Tickets.push(...resultTickets);
          FilteredTickets.push(...resultTickets);

          Sorts.set(SORTING_TICKETS_BY_CHEAPEST);

          break;
        }
      } catch (e) {
        if (!error) setError(true);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className={Styles.ticketPageWrap}>
        {loading ? <CircularProgress /> : <TicketsContent />}
      </div>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={() => setError(false)}
      >
        <Alert elevation={6} variant="filled" severity="error">
          ошибка, часть данных не удалось загрузить
        </Alert>
      </Snackbar>
    </>
  );
});

export default TicketsPage;
