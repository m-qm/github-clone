import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import RepositoryList, {
  REPOSITORY_FRAGMENT,
} from './components/Repository';
import Loader from './components/Loader';
import Profile from './components/Profile';

import ErrorMessage from './components/ErrorMessage';

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  query($cursor: String) {
    viewer {
      name
      avatarUrl
      id
      isHireable
      email
      bio
      name
      url
      repositories(
        first: 5
        orderBy: { direction: DESC, field: STARGAZERS }
        after: $cursor
      ) {
        edges {
          node {
            ...repository
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;

const App = () => (
  <Fragment>
    <Query
      query={GET_REPOSITORIES_OF_CURRENT_USER}
      notifyOnNetworkStatusChange={true}
    >
      {({ data, loading, error, fetchMore }) => {
        const { viewer } = 'm-qm';
        if (loading && !viewer) {
          return <Loader isCenter={true} />;
        }

        if (error) {
          return <ErrorMessage error={error} />;
        }

        return (
          <div className="wrapper">
            <Profile currentUser={data.viewer} />
            <RepositoryList
              loading={loading}
              repositories={data.viewer.repositories}
              fetchMore={fetchMore}
              entry={'viewer'}
            />
          </div>
        );
      }}
    </Query>
  </Fragment>
);

export default App;
