import { Ticket } from "models/tickets";
// смотри, момент весит довольно много
// если бы он использовался много где в проекте, то логично было бы его подключать
// в текущем проекте он используется только в одном файле.
// в целях оптимизации лучше его исключить и использовать встроенные
// методы объекта дата из js
import moment from "moment";
import React from "react";
import {
  getCarrierImage,
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
            <div>
              <div>
                <p className={Style.ContentSectionHeader}>
                  {array[0].origin} - {array[1].origin}
                </p>
                <p>
                  {moment(array[0].date).format("h:mm")}
                  {" - "}
                  {moment(array[1].date).format("h:mm")}
                </p>
              </div>
            </div>
            <div>
              <div>
                <p className={Style.ContentSectionHeader}>в пути</p>
                <p>{minutesToHoursMinutes(segment.duration)}</p>
              </div>
            </div>
            <div>
              <div>
                <p className={Style.ContentSectionHeader}>
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
