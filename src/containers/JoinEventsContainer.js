import {connect} from 'react-redux'
import View from '../views/JoinEvents'
import { getMyEvents } from '../actions/myEventsActions'
import { retrieveEvents } from '../actions/eventsMainActions'
import {
  joinEvent,
  viewEvent,
  changeRole,
  closeView,
  resetNotification,
} from '../actions/joinEventsActions'

const mapStateToProps = state => ({
  joinEvents: state.joinEvents,
  myEvents: state.myEvents,
  eventsMain: state.eventsMain,
})

const mapDispatchToProps = dispatch => ({
  getMyEvents: () => dispatch(getMyEvents()),
  retrieveEvents: () => dispatch(retrieveEvents()),
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
