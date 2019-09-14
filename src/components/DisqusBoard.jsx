import React from 'react';
import PropTypes from 'prop-types';
import { DiscussionEmbed, CommentCount } from 'disqus-react';
import { urlBase, disqusShortname } from '../config/API';

const DisqusBoard = (props) => {
  const {
    url, id, title, body,
  } = props;

  const disqusConfig = {
    url: urlBase + url.toLowerCase(),
    identifier: id.toLowerCase(),
    title,
  };

  return (
    <div>
      <h1>{title}</h1>
      <CommentCount shortname={disqusShortname} config={disqusConfig}>
        {'Comments'}
      </CommentCount>
      <p>{body}</p>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
};

DisqusBoard.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default DisqusBoard;
