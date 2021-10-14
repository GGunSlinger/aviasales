import { Ticket } from "models/tickets";
import React from "react";
import { getCarrierImage } from "utils/ticketUtils";
import Style from "./TicketCard.module.scss";

interface Props {
  ticket: Ticket;
  index: number;
}

// TODO доабавить работу со временем
// TODO добавить динамическое склонение для слов

const TicketCard: React.FC<Props> = ({ ticket, index }) => {
  return (
    <div className={Style.ticketWrap} key={index}>
      <div className={Style.ticketHeader}>
        <div>{ticket.price} Р</div>
        <img src={getCarrierImage(ticket.carrier)}></img>
      </div>
      {ticket.segments.map((segment, index) => {
        return (
          <div key={index} className={Style.content}>
            <div>
              <div>
                <div>{/* {array[0].origin} - {array[1].origin} */}</div>
                <div>{/* {array[0].date} - {array[1].date} */}</div>
              </div>
            </div>
            <div>
              <div>
                <div>в пути</div>
                <div>{segment.duration}</div>
              </div>
            </div>
            <div>
              <div>
                <p>{segment.stops.length} пересадки</p>
                {segment.stops.map((code, index) => (
                  <span key={index}> {code} </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TicketCard;
