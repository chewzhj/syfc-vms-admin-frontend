import API from './APIConfig'

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
