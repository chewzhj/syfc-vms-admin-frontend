import {connect} from 'react-redux'
import View from '../views/StaffChangePassword'
import {
  postChangePassword,
  changeOldPassword,
  changeNewPassword,
  changeConfirmPassword,
  resetNotification,
  discard,
} from '../actions/staffChangePasswordActions'

const mapStateToProps = state => ({
  staffChangePassword: state.staffChangePassword
})

const mapDispatchToProps = dispatch => ({
  postChangePassword: value => dispatch(postChangePassword(value)),
  changeOldPassword: value => dispatch(changeOldPassword(value)),
  changeNewPassword: value => dispatch(changeNewPassword(value)),
  changeConfirmPassword: value => dispatch(changeConfirmPassword(value)),
  resetNotification: () => dispatch(resetNotification()),
  discard: () => dispatch(discard()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
