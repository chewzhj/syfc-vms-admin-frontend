import {connect} from 'react-redux'
import View from '../views/Profile'
import {
  getProfile,
} from '../actions/profileActions'
import {loadVolunteer} from '../actions/profileEditActions'

const mapStateToProps = state => ({
  profile: state.profile
})

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(getProfile()),
  loadVolunteer: (value) => dispatch(loadVolunteer(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
