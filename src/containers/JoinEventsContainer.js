import {connect} from 'react-redux'
import View from '../views/JoinEvents'
import {
  getAvailableEventsWithPicture,
  joinEvent,
  viewEvent,
  changeRole,
  closeView,
  resetNotification,
} from '../actions/joinEventsActions'

const mapStateToProps = state => ({
  joinEvents: state.joinEvents,
})

const mapDispatchToProps = dispatch => ({
  getAvailableEvents: () => dispatch(getAvailableEventsWithPicture()),
  joinEvent: (eventId, role) => dispatch(joinEvent(eventId, role)),
  viewEvent: (value) => dispatch(viewEvent(value)),
  changeRole: (value) => dispatch(changeRole(value)),
  closeView: () => dispatch(closeView()),
  resetNotification: () => dispatch(resetNotification()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
