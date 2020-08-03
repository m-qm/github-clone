import React from 'react';

import './style.css';

const RepositoryItem = ({
  name,
  url,
  descriptionHTML,
  languages,
  owner,
  description,
  updatedAt,
}) => {
  const languagesMap = languages.nodes[0]
    ? languages.nodes[0].name
    : '';
  const languagesColor = languages.nodes[0]
    ? languages.nodes[0].color
    : '';
  return (
    <div className="repo-container">
      <h2>
        <a href={url} className="repo-name">
          {name}
        </a>
      </h2>{' '}
      <div className="repo-description">{description}</div>
      <div
        className="RepositoryItem-description-info"
        dangerouslySetInnerHTML={{ __html: descriptionHTML }}
      />
      {owner && (
        <span>
          Owner: <a href={owner.url}>{owner.login}</a>
        </span>
      )}
      <div className="repo-language">
        <span
          className="dot"
          style={{ backgroundColor: languagesColor }}
        ></span>
        {languagesMap && <span>Language: {languagesMap}</span>}
        <div className="repo-updated">
          Updated At: {new Date(updatedAt).toDateString()}
        </div>
      </div>
    </div>
  );
};

export default RepositoryItem;
