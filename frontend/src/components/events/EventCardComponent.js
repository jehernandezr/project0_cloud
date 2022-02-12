import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./EventCard.scss";
import "../../pages/Style.scss";

export const EventCard = ({ event }) => {
  return (
    <div className="card">
      <h5 className="card-header">{event.name}</h5>
      <div className="card-body">
        <p className="card-text">Category: {event.category}</p>
        <div>
		<small>starts at: {event.ends_at}</small> &nbsp; <small>ends at: {event.ends_at}</small>
        </div>
      </div>
    </div>
  );
};
