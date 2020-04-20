import API from './APIConfig'

// Event Main
export async function getAllEventsAPI() {
  try {
    let data = await API.get('eventAPI/retrieveAllEvents')
    console.log(data);
    return data
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return [];
  }
}

export async function getVolunteersInEventAPI(eventId) {
  try {
    let data = await API.get('eventAPI/retrieveVolunteersInEvent/' + eventId)
    console.log(data);
    return data
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return [];
  }
}

// Event Create
export async function postCreateNewEventAPI(eventObject) {
  try {
    let data = await API.post('eventAPI/createEvent',
      eventObject
    )
    console.log(data);
    return data
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return [];
  }
}

// Event Edit
export async function postUpdateEventAPI(eventId, eventObject) {
  try {
    let data = await API.post('eventAPI/updateEvent/' + eventId,
      eventObject
    )
    console.log(data);
    return data
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return [];
  }
}

// Event Delete
export async function deleteEventAPI(eventId) {
  try {
    let data = await API.delete('eventAPI/deleteEvent/' + eventId)
    console.log(data);
    return data
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return [];
  }
}

// Get Events of Volunteer
export async function getEventsOfVolunteerAPI() {
  const volId = sessionStorage.getItem('id')
  try {
    let data = await API.get('/eventAPI/retrieveVolunteerEvents/' + volId)
    console.log(data);
    return data
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return [];
  }
}

export async function postJoinEventAPI(eventId) {
  const volId = sessionStorage.getItem('id')
  console.log(eventId, volId);
  try {
    let data = await API.post(`/eventAPI/volunteerJoinEvent/${eventId}&${volId}`)
    console.log(data);
    return data
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return [];
  }
}
