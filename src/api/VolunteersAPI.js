import API from './APIConfig'

// Volunteers Main
export async function getAllVolunteersAPI() {
  try {
    let data = await API.get('volunteerAPI/retrieveAllVolunteers')
    console.log(data);
    return data
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return [];
  }
}

// Volunteers Create
export async function postCreateNewVolunteerAPI(volunteerObject) {
  try {
    let data = await API.post('volunteerAPI/createVolunteer',
      volunteerObject
    )
    console.log(data);
    return data
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return [];
  }
}
