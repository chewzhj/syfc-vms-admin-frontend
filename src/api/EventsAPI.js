import API from './APIConfig'

// Event Main
export async function getAllEventsAPI() {
  try {
    let data = await API.get('eventAPI/retrieveAllEvents')
    return data
  } catch (e) {
    return [];
  }
}

export async function getVolunteersInEventAPI(eventId) {
  try {
    let data = await API.get('eventAPI/retrieveVolunteersInEvent/' + eventId)
    return data
  } catch (e) {
    return [];
  }
}

// Event Create
export async function postCreateNewEventAPI(eventObject) {
  try {
    let data = await API.post('eventAPI/createEvent',
      eventObject
    )
    return data
  } catch (e) {
    return [];
  }
}

// Event Edit
export async function postUpdateEventAPI(eventId, eventObject) {
  try {
    let data = await API.post('eventAPI/updateEvent/' + eventId,
      eventObject
    )
    return data
  } catch (e) {
    return [];
  }
}

// Event Delete
export async function deleteEventAPI(eventId) {
  try {
    let data = await API.delete('eventAPI/deleteEvent/' + eventId)
    return data
  } catch (e) {
    return [];
  }
}

// Get Events of Volunteer
export async function getEventsOfVolunteerAPI(passedVolId) {
  const volId = passedVolId || sessionStorage.getItem('id')
  try {
    let data = await API.get('/eventAPI/retrieveVolunteerEvents/' + volId)
    return data
  } catch (e) {
    return [];
  }
}

export async function postJoinEventAPI(eventId, role) {
  const volId = sessionStorage.getItem('id')
  try {
    let data = await API.post(`/eventAPI/volunteerJoinEvent/${eventId}&${volId}`, {
      role: role
    })
    return data
  } catch (e) {
    return [];
  }
}
