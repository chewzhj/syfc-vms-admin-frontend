import API from './APIConfig'

// Staff Login
export async function postStaffLoginAPI(staffLoginObject) {
  try {
    let data = await API.post('staffAPI/staffLogin',
      staffLoginObject
    )
    return data
  } catch (e) {
    return [];
  }
}

// Volunteer Login
export async function postVolunteerLoginAPI(volunteerLoginObject) {
  try {
    let data = await API.post('volunteerAPI/volunteerLogin',
      volunteerLoginObject
    )
    return data
  } catch (e) {
    return [];
  }
}

export function logout() {
  sessionStorage.clear()
  window.location.href = '/login'
}
