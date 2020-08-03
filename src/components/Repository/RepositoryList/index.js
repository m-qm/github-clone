import React, { Fragment } from 'react';

import RepositoryItem from '../RepositoryItem';
import Loader from '../../Loader';

import './style.css';

const RepositoryList = ({ loading, data, query }) => {
  if (loading) {
    return <Loader />;
  }
  if (!query) {
    return (
      <Fragment>
        {data.viewer &&
          data.viewer.repositories.edges.map(({ node }) => (
            <div key={node.id} className="RepositoryItem">
              <RepositoryItem {...node} />
            </div>
          ))}
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        {data.search &&
          data.search.edges.map(({ node }) => (
            <RepositoryItem {...node} key={node.id} />
          ))}
      </Fragment>
    );
  }
};
export default RepositoryList;
