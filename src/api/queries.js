import gql from 'graphql-tag';

import { REPOSITORY_FRAGMENT } from '../components/Repository/fragments';

export const GET_REPOSITORIES_OF_CURRENT_USER = gql`
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

export const SEARCH_FOR_REPOS = gql`
  query($search_term: String!) {
    search(query: $search_term, first: 50) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            id
            name
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
