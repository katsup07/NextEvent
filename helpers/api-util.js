export async function getAllEvents() {
	const response = await fetch(
		'https://nextjs-course-1834e-default-rtdb.asia-southeast1.firebasedatabase.app/events.json'
	);
	if (!response.ok) return console.log(response);

	const eventData = await response.json();

	const events = [];
	for (const key in eventData) {
		// const { title, description, location, date, image, isFeatured } = eventData[key];
		events.push({ id: key, ...eventData[key] });
	}
	return events;
}

export async function getFeaturedEvents() {
	const allEvents = await getAllEvents();
	console.log('events in api-util.js', allEvents);
	return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();
  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}