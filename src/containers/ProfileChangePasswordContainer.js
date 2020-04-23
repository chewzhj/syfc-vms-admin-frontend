import {connect} from 'react-redux'
import View from '../views/ProfileChangePassword'
import {
  postChangePassword,
  changeOldPassword,
  changeNewPassword,
  changeConfirmPassword,
  resetNotification,
  discard,
} from '../actions/profileChangePasswordActions'

const mapStateToProps = state => ({
  profileChangePassword: state.profileChangePassword
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
