import React from 'react';
import PropTypes from 'prop-types';
import { DiscussionEmbed, CommentCount } from 'disqus-react';
import { urlBase, disqusShortname } from '../config/API';

class DisqusBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      u: props.url,
      i: props.id,
      t: props.title,
      b: props.body,
    };
  }

  render() {
    const {
      u, i, t, b,
    } = this.state;
    const disqusConfig = {
      url: urlBase + u.toLowerCase(),
      identifier: i.toLowerCase(),
      title: t,
    };
    return (
      <div>
        <h1>{t}</h1>
        <CommentCount shortname={disqusShortname} config={disqusConfig}>
          {'Comments'}
        </CommentCount>
        <p>{b}</p>
        <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
      </div>
    );
  }
}

DisqusBoard.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default DisqusBoard;
