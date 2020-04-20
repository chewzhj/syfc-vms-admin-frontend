import {connect} from 'react-redux'
import View from '../views/Profile'
import {
  getProfile,
} from '../actions/profileActions'

const mapStateToProps = state => ({
  profile: state.profile
})

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(getProfile()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(View)
