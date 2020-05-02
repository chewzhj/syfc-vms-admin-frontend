import API, {baseURL} from './APIConfig'
import axios from 'axios'

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
      eventObject,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
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

export async function getEventPictureAPI(eventId) {
  try {
    let data = await axios.get(`${baseURL}eventAPI/getEventPic/${eventId}`)
    return data
  } catch (e) {
    return e;
  }
}

export async function postUpdateEventPictureAPI(eventId, picture) {
  try {
    let data = await axios.post(`${baseURL}eventAPI/uploadNewEventPic/${eventId}`,
      picture,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    )
    return data
  } catch (e) {
    return e;
  }
}
