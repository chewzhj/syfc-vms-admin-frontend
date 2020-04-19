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
