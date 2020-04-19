import {connect} from 'react-redux'
import View from '../views/VolunteersMain'
import {
  retrieveVolunteers,
} from '../actions/volunteersMainActions'

const mapStateToProps = state => ({
  volunteersMain: state.volunteersMain
})

const mapDispatchToProps = dispatch => ({
  retrieveVolunteers: () => dispatch(retrieveVolunteers()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
