import {connect} from 'react-redux'
import View from '../views/VolunteersMain'
import {
  retrieveVolunteers,
} from '../actions/volunteersMainActions'
import { loadVolunteer } from '../actions/volunteersEditActions'

const mapStateToProps = state => ({
  volunteersMain: state.volunteersMain
})

const mapDispatchToProps = dispatch => ({
  retrieveVolunteers: () => dispatch(retrieveVolunteers()),
  loadVolunteer: (value) => dispatch(loadVolunteer(value)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
