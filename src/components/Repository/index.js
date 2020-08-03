import React from 'react';
import RepositoryList from './RepositoryList';
import REPOSITORY_FRAGMENT from './fragments';

export { REPOSITORY_FRAGMENT };

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_CURRENT_USER = gql`
  query listRepos($query: String!, $cursor: String) {
    search(
      query: $query
      type: REPOSITORY
      first: 40
      after: $cursor
    ) {
      repositoryCount
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
      edges {
        node {
          ... on Repository {
            id
            name
            description
            url
            updatedAt
            owner {
              login
              url
            }
            stargazers {
              totalCount
            }
          }
        }
      }
    }
  }
`;

const PublicRepositories = ({ query }) => {
  return (
    <Query
      query={GET_CURRENT_USER}
      variables={{ query }}
      notifyOnNetworkStatusChange={true}
    >
      {({ data, loading, error, fetchMore }) => {
        if (error) {
          return (
            <div>
              <p>{error.toString()}</p>
            </div>
          );
        }

        if (loading && !data) {
          return null;
        }

        return (
          <RepositoryList
            query={query}
            data={data}
            fetchMore={fetchMore}
          />
        );
      }}
    </Query>
  );
};
export default PublicRepositories;
