import {connect} from 'react-redux'
import View from '../views/LoginVolunteer'
import {
  volunteerLogin,
  changeEmail,
  changePassword,
  reset,
  resetNotification,
} from '../actions/loginVolunteerActions'

const mapStateToProps = state => ({
  loginVolunteer: state.loginVolunteer
})

const mapDispatchToProps = dispatch => ({
  volunteerLogin: value => dispatch(volunteerLogin(value)),
  changeEmail: value => dispatch(changeEmail(value)),
  changePassword: value => dispatch(changePassword(value)),
  reset: () => dispatch(reset()),
  resetNotification: () => dispatch(resetNotification()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
