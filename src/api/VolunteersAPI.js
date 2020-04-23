import API from './APIConfig'

// Volunteers Main
export async function getAllVolunteersAPI() {
  try {
    let data = await API.get('volunteerAPI/retrieveAllVolunteers')
    return data
  } catch (e) {
    return [];
  }
}

// Volunteers Create
export async function postCreateNewVolunteerAPI(volunteerObject) {
  try {
    let data = await API.post('volunteerAPI/createVolunteer',
      volunteerObject
    )
    return data
  } catch (e) {
    return [];
  }
}

// Volunteers Create
export async function postUpdateVolunteerAPI(volId, volunteerObject) {
  try {
    let data = await API.post('volunteerAPI/updateVolunteer/' + volId,
      volunteerObject
    )
    return data
  } catch (e) {
    return [];
  }
}

// Get Volunteer Profile
export async function getProfileAPI() {
  const volId = sessionStorage.getItem('id')
  try {
    let data = await API.get('volunteerAPI/retrieveVolunteer/' + volId)
    return data
  } catch (e) {
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
    return data
  } catch (e) {
    return [];
  }
}
