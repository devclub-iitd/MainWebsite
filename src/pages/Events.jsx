import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchEvents as fetchEventsAction } from '../actions/allActions';
import CustomModal from '../components/CustomModal';

const mapStateToProps = state => ({
  data: state.completeReducer.data.events,
  isLoading: state.completeReducer.isLoading.events,
  error: state.completeReducer.errorFetching.events,
});

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEventsAction()),
});
class Events extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    if (data === undefined || data.length === 0) {
      const { fetchEvents } = this.props;
      fetchEvents();
    }
  }

  renderEvents() {
    const { data, isLoading, error } = this.props;

    if (isLoading !== false) {
      return 'Loading';
    }
    if (error) {
      return 'Error';
    }

    const renders = [];

    const keys = Object.keys(data[0]);

    for (let i = 0; i < data.length; i += 1) {
      const eventsData = [];
      keys.forEach((key) => { eventsData.push(`${key}: ${data[i][key]}`); eventsData.push(<br key={`eventsBR${key}`} />); });
      const project = (
        <li key={`events${i}`}>
          <div>
            {eventsData}
            <CustomModal
              url={data[i].id}
              id={data[i].id}
            />
          </div>
          <br />
        </li>
      );
      renders.push(project);
    }

    return renders;
  }


  render() {
    return (
      <React.Fragment>
        <div>
                  Events
          <ul>
            {this.renderEvents()}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

Events.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  fetchEvents: PropTypes.func.isRequired,
};

Events.defaultProps = {
  data: [],
  isLoading: true,
  error: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
