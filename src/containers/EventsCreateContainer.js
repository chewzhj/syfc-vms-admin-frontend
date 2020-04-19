import {connect} from 'react-redux'
import View from '../views/EventsCreate'
import {
  changeTitle,
  changeDates,
  changeDesc,
  discard,
  submitEvent,
  resetNotification,
} from '../actions/eventsCreateActions'

const mapStateToProps = state => ({
  eventsCreate: state.eventsCreate
})

const mapDispatchToProps = dispatch => ({
  changeTitle: value => dispatch(changeTitle(value)),
  changeDates: value => dispatch(changeDates(value)),
  changeDesc: value => dispatch(changeDesc(value)),
  discard: () => dispatch(discard()),
  submitEvent: value => dispatch(submitEvent(value)),
  resetNotification: () => dispatch(resetNotification()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
