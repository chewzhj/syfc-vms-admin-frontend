import {connect} from 'react-redux'
import View from '../views/EventsMain'
import {
  retrieveEvents,
} from '../actions/eventsMainActions'

const mapStateToProps = state => ({
  eventsMain: state.eventsMain
})

const mapDispatchToProps = dispatch => ({
  retrieveEvents: () => dispatch(retrieveEvents()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
