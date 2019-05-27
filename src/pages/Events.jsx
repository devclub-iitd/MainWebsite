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

  getEmbedCode() {
    const images = (
      <React.Fragment>
        <script src="https://cdn.jsdelivr.net/npm/publicalbum@latest/dist/pa-embed-player.min.js" async></script>
        <div className="pa-embed-player"
          data-link="https://photos.app.goo.gl/CSV7NDstShTUwUZq5"
          data-title="Mr. Monstro"
          data-description="Mr. Monstro is a great traveler. He visited Madeira, Poland, but also Georgia, Italy ...">
          <img data-src="https://lh3.googleusercontent.com/XlH6wo2PzrAEqmplYrZwV0fI-2TafTT6BRwZhKDfZSHd_zT7HIdPyPWd3Xuqhn1QQADuTJ32QFmcgYiTOEU0sC4Bvf-VyTIiq-DxxEaxIeWDYyUK_VjaW8-zrMGBvekDZT77lpduYQ=w1920-h1080" src="" alt="" />
          <img data-src="https://lh3.googleusercontent.com/HISe-DV_b4gjLvSEGzrJlsqBU2rSE8uQpSqHHKTPihg_Ax9VtfCrOrvdXF01raBeBleAWQKI7Hfb4_w9vZeJKFymQfNTlubwXxTBTbqGTPwjg7S0CBtQsQJqsspvIhD9c-pniSZrEw=w1920-h1080" src="" alt="" />
          <img data-src="https://lh3.googleusercontent.com/05lhR1IAQY_B9rdQ_GvHDNLe1lJsSPyyuDeIMkt--gDDAnO2_EATwif7-sfNd2K_48RvyqKmN-u2svKZ06yfh8bnrbQ5kBUrIHfZvWheTzDGhIeFd1roPor-F_BycJmVKbQO6a9EaA=w1920-h1080" src="" alt="" />
          <img data-src="https://lh3.googleusercontent.com/VvK__Vx8kpPTP57WZPLblacZbTE0NqWeIGTyHSQ8Rq9pvOpWQG_CQE_tOc6jHPtj02XIBYa0Zo9fWbXXQyNYs9hDGGj34QibKFJky4W9nYBpSb57OwxiQoDyo25vzIXMTN2SNxuzqg=w1920-h1080" src="" alt="" />
        </div>
      </React.Fragment>
    );
    return images;
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
              title={`${data[i].Name} ${data[i].Date}`}
            />
            {this.getEmbedCode()}
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
