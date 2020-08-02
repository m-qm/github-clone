import React, { Fragment } from 'react';

import FetchMore from '../../FetchMore';
import RepositoryItem from '../RepositoryItem';

import gql from 'graphql-tag';

import './style.css';

const getUpdateQuery = (entry) => (
  previousResult,
  { fetchMoreResult },
) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return {
    ...previousResult,
    [entry]: {
      ...previousResult[entry],
      repositories: {
        ...previousResult[entry].repositories,
        ...fetchMoreResult[entry].repositories,
        edges: [
          ...previousResult[entry].repositories.edges,
          ...fetchMoreResult[entry].repositories.edges,
        ],
      },
    },
  };
};

export const SEARCH_FOR_REPOS = gql`
  query($search_term: String!) {
    search(
      query: $search_term
      type: REPOSITORY
      first: 50
      user: "m-qm"
    ) {
      repositoryCount
      edges {
        node {
          ... on User {
            login
          }
          ... on Repository {
            id
            name
            updated_at
            owner {
              login
              avatarUrl
            }
            stargazers {
              totalCount
            }
            descriptionHTML
            primaryLanguage {
              name
            }
            forkCount
          }
        }
      }
    }
  }
`;

const RepositoryList = ({
  loading,
  fetchMore,
  entry,
  data,
  query,
}) => {
  if (!query) {
    return (
      <Fragment>
        {data.viewer &&
          data.viewer.repositories.edges.map(({ node }) => (
            <div key={node.id} className="RepositoryItem">
              <RepositoryItem {...node} />
            </div>
          ))}
        <FetchMore
          loading={loading}
          hasNextPage={
            data.search
              ? data.search.pageInfo.hasNextPage
              : data.viewer.hasNextPage
          }
          variables={{
            cursor: data.search
              ? data.search.pageInfo.endCursor
              : data.viewer.hasNextPage,
          }}
          updateQuery={getUpdateQuery(entry)}
          fetchMore={fetchMore}
        >
          Repositories
        </FetchMore>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        {data.search &&
          data.search.edges.map(({ node }) => (
            <div className="repo-container" key={node.id}>
              <RepositoryItem {...node} />
            </div>
          ))}
      </Fragment>
    );
  }
};
export default RepositoryList;
