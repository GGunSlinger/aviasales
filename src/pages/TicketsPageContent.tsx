import TicketCard from "components/ticketCard/TicketCard";
import TransferCountFilter from "components/transferCountFilter/TransferCountFilter";
import React, { useState } from "react";
import Styles from "./TicketsPage.module.scss";
import Logo from "images/Logo.png";
import TicketsSort from "components/ticketsSort/TicketsSort";
import { observer } from "mobx-react-lite";
import { FilteredTickets } from "store/store";
import { Button, Card } from "@mui/material";

const TicketsContent: React.FC = observer(() => {
  const pageToLoad = 5;
  const [ticketsCount, setTicketsCount] = useState(pageToLoad);

  return (
    <div>
      <div className={Styles.ticketsPageHeader}>
        <img src={Logo} alt="Aviasales" />
      </div>
      <div>
        <div className={Styles.ticketsPageContent}>
          <div className={Styles.ticketsSort}>
            <TicketsSort />
          </div>
          <div className={Styles.transferFilter}>
            <TransferCountFilter />
          </div>
          <div>
            {FilteredTickets.map(
              (ticket, index) =>
                index < ticketsCount && (
                  <Card key={index} sx={{ mb: "20px" }}>
                    <TicketCard index={index} ticket={ticket} />
                  </Card>
                )
            )}
          </div>
          {ticketsCount < FilteredTickets.length && (
            <Button
              className={Styles.button}
              variant="contained"
              disableElevation
              onClick={() => setTicketsCount(ticketsCount + pageToLoad)}
            >
              Показать еще 5 билетов!
            </Button>
          )}
        </div>
      </div>
    </div>
  );
});

export default TicketsContent;
