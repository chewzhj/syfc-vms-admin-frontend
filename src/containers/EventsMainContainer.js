import {connect} from 'react-redux'
import View from '../views/EventsMain'
import {
  retrieveEvents,
} from '../actions/eventsMainActions'
import {
  loadEvent
} from '../actions/eventsEditActions'

const mapStateToProps = state => ({
  eventsMain: state.eventsMain
})

const mapDispatchToProps = dispatch => ({
  retrieveEvents: () => dispatch(retrieveEvents()),
  loadEvent: value => dispatch(loadEvent(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
