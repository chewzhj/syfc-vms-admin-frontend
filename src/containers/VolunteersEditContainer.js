import {connect} from 'react-redux'
import View from '../views/VolunteersEdit'
import {
  editVolunteer,
  changeName,
  changeEmail,
  changePassword,
  changeDob,
  changeNRIC,
  changeAddress,
  changePostal,
  changeChurch,
  changeDept,
  changeGender,
  changeNumber,
  resetNotification,
  discard,
} from '../actions/volunteersEditActions'

const mapStateToProps = state => ({
  volunteersEdit: state.volunteersEdit
})

const mapDispatchToProps = dispatch => ({
  editVolunteer: (volId, volunteerObject) => dispatch(editVolunteer(volId, volunteerObject)),
  changeName: (value) => dispatch(changeName(value)),
  changeEmail: (value) => dispatch(changeEmail(value)),
  changePassword: (value) => dispatch(changePassword(value)),
  changeDob: (value) => dispatch(changeDob(value)),
  changeNRIC: (value) => dispatch(changeNRIC(value)),
  changeAddress: (value) => dispatch(changeAddress(value)),
  changePostal: (value) => dispatch(changePostal(value)),
  changeChurch: (value) => dispatch(changeChurch(value)),
  changeDept: (value) => dispatch(changeDept(value)),
  changeGender: (value) => dispatch(changeGender(value)),
  changeNumber: (value) => dispatch(changeNumber(value)),
  resetNotification: () => dispatch(resetNotification()),
  discard: () => dispatch(discard()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
