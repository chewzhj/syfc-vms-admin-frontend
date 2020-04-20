import {connect} from 'react-redux'
import View from '../views/LoginStaff'
import {
  staffLogin,
  changeUsername,
  changePassword,
  reset,
  resetNotification,
} from '../actions/loginStaffActions'

const mapStateToProps = state => ({
  loginStaff: state.loginStaff
})

const mapDispatchToProps = dispatch => ({
  staffLogin: value => dispatch(staffLogin(value)),
  changeUsername: value => dispatch(changeUsername(value)),
  changePassword: value => dispatch(changePassword(value)),
  reset: () => dispatch(reset()),
  resetNotification: () => dispatch(resetNotification()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
