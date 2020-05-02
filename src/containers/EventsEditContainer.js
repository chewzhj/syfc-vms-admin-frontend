import {connect} from 'react-redux'
import View from '../views/EventsEdit'
import {
  changeTitle,
  changeDates,
  changeDesc,
  changeRoles,
  openPictureDialog,
  closePictureDialog,
  choosePicture,
  loadPicture,
  updatePicture,
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
  changeRoles: value => dispatch(changeRoles(value)),
  openPictureDialog: () => dispatch(openPictureDialog()),
  closePictureDialog: () => dispatch(closePictureDialog()),
  choosePicture: value => dispatch(choosePicture(value)),
  loadPicture: value => dispatch(loadPicture(value)),
  updatePicture: (eventId, pictureForm) => dispatch(updatePicture(eventId, pictureForm)),
  discard: () => dispatch(discard()),
  editEvent: (id, eventObject) => dispatch(editEvent(id, eventObject)),
  deleteEvent: value => dispatch(deleteEvent(value)),
  resetNotification: () => dispatch(resetNotification()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
