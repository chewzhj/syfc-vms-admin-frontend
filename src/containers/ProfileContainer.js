import {connect} from 'react-redux'
import View from '../views/Profile'
import {
  getProfile,
} from '../actions/profileActions'
import {getMyEvents} from '../actions/myEventsActions'
import {loadVolunteer} from '../actions/profileEditActions'

const mapStateToProps = state => ({
  profile: state.profile,
  myEvents: state.myEvents
})

const mapDispatchToProps = dispatch => ({
  getMyEvents: () => dispatch(getMyEvents()),
  getProfile: () => dispatch(getProfile()),
  loadVolunteer: (value) => dispatch(loadVolunteer(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
