import API from './APIConfig'

// Change password as staff
export async function postChangeStaffPasswordAPI(passwordObject) {
  const staffId = sessionStorage.getItem('id')
  try {
    let data = await API.post('volunteerAPI/changeVolunteerPassword/' + staffId,
      passwordObject
    )
    console.log(data);
    return data
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return [];
  }
}
