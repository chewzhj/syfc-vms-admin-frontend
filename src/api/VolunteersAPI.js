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

// Volunteers Create
export async function postUpdateVolunteerAPI(volId, volunteerObject) {
  try {
    let data = await API.post('volunteerAPI/updateVolunteer/' + volId,
      volunteerObject
    )
    console.log(data);
    return data
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return [];
  }
}

// Get Volunteer Profile
export async function getProfileAPI() {
  const volId = sessionStorage.getItem('id')
  try {
    let data = await API.get('volunteerAPI/retrieveVolunteer/' + volId)
    console.log(data);
    return data
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return [];
  }
}

// Change password as Volunteer
export async function postChangePasswordAPI(passwordObject) {
  const volId = sessionStorage.getItem('id')
  try {
    let data = await API.post('volunteerAPI/changeVolunteerPassword/' + volId,
      passwordObject
    )
    console.log(data);
    return data
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return [];
  }
}
