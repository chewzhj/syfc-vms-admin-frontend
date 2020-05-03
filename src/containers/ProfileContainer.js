import {connect} from 'react-redux'
import View from '../views/Profile'
import {
  getProfile,
} from '../actions/profileActions'
import {getMyEventsWithPicture} from '../actions/myEventsActions'
import {loadVolunteer} from '../actions/profileEditActions'

const mapStateToProps = state => ({
  profile: state.profile,
  myEvents: state.myEvents
})

const mapDispatchToProps = dispatch => ({
  getMyEvents: () => dispatch(getMyEventsWithPicture()),
  getProfile: () => dispatch(getProfile()),
  loadVolunteer: (value) => dispatch(loadVolunteer(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
