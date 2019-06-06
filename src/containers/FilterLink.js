import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions/allActions';
// eslint-disable-next-line import/extensions
import Link from '../components/Link.jsx';

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setVisibilityFilter(ownProps.filter)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Link);
