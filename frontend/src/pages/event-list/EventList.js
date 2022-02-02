import { EventCard } from "../../components/events/EventCardComponent";
import React from "react";
import { Link } from "react-router-dom";
import "./EventList.scss";
import "../Palette.scss";
import useUser from "../../hooks/useUser";

import {v4} from 'uuid'



export const EventList = (props) => {;
	const { events } = useUser();

	/* display flex row wrap en scss*/
	return (
		<div className="container-fluid">
			<h1 className="row justify-content-center">
				Events
			</h1>
			<div className="row justify-content-center">
				{ events && events.map((event) => (
					<Link to={`/events/${event.id}`} key= {v4()}>
						<EventCard key={event.id ?? v4() } event={event}></EventCard>
					</Link>
				))}
			</div>
		</div>
	);
};
