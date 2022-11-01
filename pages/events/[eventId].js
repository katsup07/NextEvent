import { getEventById, getFeaturedEvents } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage({ event }) {

	if (!event) {
		return (
			<div className="center">
				<p>No event found!</p>
			</div>
		);
	}

	return (
		<>
			<EventSummary title={event.title} />
			<EventLogistics
				date={event.date}
				address={event.location}
				image={event.image}
				imageAlt={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
		</>
	);
}


export async function getStaticProps({ params }) {
	const eventId = params.eventId;
	const event = await getEventById(eventId);

	return {
		props: {
			event,
		},
    revalidate: 30,
	};
}

export async function getStaticPaths(){
  const events = await getFeaturedEvents();
  const pathsWithParams = events.map(event =>({params: {eventId: event.id}}));

  return { 
    paths: pathsWithParams,
    fallback: 'blocking',
  }
}


export default EventDetailPage;
