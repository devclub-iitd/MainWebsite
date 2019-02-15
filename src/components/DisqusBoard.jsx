import React from 'react';
import PropTypes from 'prop-types';
import { DiscussionEmbed, CommentCount } from 'disqus-react';

const DisqusBoard = (props) => {
  const disqusShortname = 'devclub-in-1';
  const {
    url, id, title, body,
  } = props;

  const disqusConfig = {
    url,
    identifier: id,
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
