import { EventCard } from "../../components/events/EventCardComponent";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./EventList.scss";
import "../Palette.scss";
import useUser from "../../hooks/useUser";

import {v4} from 'uuid'
import { EventDetailCreation } from "../event-detail/EventDetailCreation";



export const EventList = (props) => {
	const { events } = useUser();

	useEffect(()=> {},[events])
	/* display flex row wrap en scss*/
	return (
		<>
		<div className="container-fluid">
			<h1 className="row justify-content-center">
				Events
			</h1>
			<br></br>
			<div className="row justify-content-center visible">
				{ events && events.length && events?.map((event) => (
					<Link to={`/events/${event.id}`} key= {v4()}>
						<EventCard key={event.id ?? v4() } event={event}></EventCard>
					</Link>
				))}
			</div>
			<br></br>
			<br></br>
			<br></br>
			<EventDetailCreation></EventDetailCreation>
		</div>
		
		</>
		
	);
};
