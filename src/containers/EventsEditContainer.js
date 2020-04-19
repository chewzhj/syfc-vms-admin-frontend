import {connect} from 'react-redux'
import View from '../views/EventsEdit'
import {
  changeTitle,
  changeDates,
  changeDesc,
  discard,
  editEvent,
  deleteEvent,
  resetNotification,
} from '../actions/eventsEditActions'

const mapStateToProps = state => ({
  eventsEdit: state.eventsEdit
})

const mapDispatchToProps = dispatch => ({
  changeTitle: value => dispatch(changeTitle(value)),
  changeDates: value => dispatch(changeDates(value)),
  changeDesc: value => dispatch(changeDesc(value)),
  discard: () => dispatch(discard()),
  editEvent: (id, eventObject) => dispatch(editEvent(id, eventObject)),
  deleteEvent: value => dispatch(deleteEvent(value)),
  resetNotification: () => dispatch(resetNotification()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
