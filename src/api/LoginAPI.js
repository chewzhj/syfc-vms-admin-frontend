import API from './APIConfig'

// Staff Login
export async function postStaffLoginAPI(staffLoginObject) {
  try {
    let data = await API.post('staffAPI/staffLogin',
      staffLoginObject
    )
    console.log(data);
    return data
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return [];
  }
}

// Volunteer Login
export async function postVolunteerLoginAPI(volunteerLoginObject) {
  try {
    let data = await API.post('volunteerAPI/volunteerLogin',
      volunteerLoginObject
    )
    console.log(data);
    return data
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return [];
  }
}

export function logout() {
  sessionStorage.clear()
  window.location.href = '/login'
}
