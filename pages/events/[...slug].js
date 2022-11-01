import { getFilteredEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage({year, month, filteredEvents }) {

  if (!(filteredEvents)){
    return <p className='center'>Loading...</p>;
  }

  if (isNaN(year) || isNaN(month) || year > 2030 || year < 2021 || month < 1 || month > 12) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  if (filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(year, month - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

export async function getServerSideProps(context){
  const { params } = context;
  const [ filterYear, filterMonth ] = params.slug;
  const [numYear, numMonth] = [+filterYear, +filterMonth];
  
  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
 
  return {
    props: {
      year: numYear,
      month: numMonth,
      filteredEvents,
    }
  }
}

export default FilteredEventsPage;
