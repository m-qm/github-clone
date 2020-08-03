import React from 'react';

import './style.css';

const RepositoryItem = ({
  name,
  url,
  descriptionHTML,
  primaryLanguage,
  owner,
  description,
  updatedAt,
}) => (
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
    <div className="repo-language">
      <div>
        {primaryLanguage && (
          <span>Language: {primaryLanguage.name}</span>
        )}
        <div>
          {owner && (
            <span>
              Owner: <a href={owner.url}>{owner.login}</a>
            </span>
          )}
          <div className="repo-updated">
            Updated At: {new Date(updatedAt).toDateString()}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RepositoryItem;
