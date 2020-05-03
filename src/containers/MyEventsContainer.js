import {connect} from 'react-redux'
import View from '../views/MyEvents'
import {
  getMyEventsWithPicture,
  viewEvent,
  closeView,
} from '../actions/myEventsActions'

const mapStateToProps = state => ({
  myEvents: state.myEvents
})

const mapDispatchToProps = dispatch => ({
  getMyEvents: () => dispatch(getMyEventsWithPicture()),
  viewEvent: (value) => dispatch(viewEvent(value)),
  closeView: () => dispatch(closeView()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
