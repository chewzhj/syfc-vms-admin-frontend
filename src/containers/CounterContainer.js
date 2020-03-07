import { incrementCounter, resetCounter, changeIncrement } from '../actions/counterActions';
import { connect } from 'react-redux';
import Counter from '../views/Counter';

const mapStateToProps = state => ({
  counter: state.counter,
})

const mapDispatchToProps = dispatch => ({
  changeIncrement: (value) => dispatch(changeIncrement(value)),
  incrementCounter: () => dispatch(incrementCounter()),
  resetCounter: () => dispatch(resetCounter()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter)
