import API from './APIConfig'

// Change password as staff
export async function postChangeStaffPasswordAPI(passwordObject) {
  const staffId = sessionStorage.getItem('id')
  try {
    let data = await API.post('volunteerAPI/changeVolunteerPassword/' + staffId,
      passwordObject
    )
    return data
  } catch (e) {
    return [];
  }
}
