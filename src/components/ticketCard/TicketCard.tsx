import { Ticket } from "models/tickets";
import React from "react";
import {
  getCarrierImage,
  getTimeHoursMinutes,
  minutesToHoursMinutes,
  pluralize,
} from "utils/ticketUtils";
import Style from "./TicketCard.module.scss";

interface Props {
  ticket: Ticket;
  index: number;
}

const TicketCard: React.FC<Props> = ({ ticket, index }) => {
  return (
    <div className={Style.ticketWrap} key={index}>
      <div className={Style.ticketHeader}>
        <div>{ticket.price} Р</div>
        <img
          src={getCarrierImage(ticket.carrier)}
          alt={ticket.carrier}
          style={{ width: "25%" }}
        ></img>
      </div>
      {ticket.segments.map((segment, index, array) => {
        return (
          <div key={index} className={Style.content}>
            <div className={Style.contentItem}>
              <div>
                <p className={Style.contentSectionHeader}>
                  {array[0].origin} - {array[1].origin}
                </p>
                <p>
                  {getTimeHoursMinutes(array[0].date)}
                  {" - "}
                  {getTimeHoursMinutes(array[1].date)}
                </p>
              </div>
            </div>
            <div className={Style.contentItem}>
              <div>
                <p className={Style.contentSectionHeader}>в пути</p>
                <p>{minutesToHoursMinutes(segment.duration)}</p>
              </div>
            </div>
            <div className={Style.contentItem}>
              <div>
                <p className={Style.contentSectionHeader}>
                  {pluralize(segment.stops.length, [
                    "пересадка",
                    "пересадки",
                    "пересадок",
                  ])}
                </p>
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
