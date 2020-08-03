import React, { Fragment, useState, useRef, useEffect } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import PublicRepositories, {
  REPOSITORY_FRAGMENT,
} from './components/Repository';

import './App.css';

import Loader from './components/Loader';
import RepositoryList from './components/Repository/RepositoryList';

import Profile from './components/Profile';
import Filter from './components/Filter';

import { useDebounce } from './utils/hooks';

import ErrorMessage from './components/ErrorMessage';

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  query($cursor: String) {
    viewer {
      avatarUrl
      id
      isHireable
      email
      bio
      name
      url
      repositories(
        first: 10
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

const App = () => {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('');

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const debouncedQuery = useDebounce(query + 'user:m-qm', 500);
  let inputRef = useRef(null);
  const onChangeHandler = (e) => {
    setTab(tab, e.target.value);
    console.log(tab, e.target.value);
  };

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  });
  return (
    <Fragment>
      <Query
        query={GET_REPOSITORIES_OF_CURRENT_USER}
        notifyOnNetworkStatusChange={true}
      >
        {({ data, loading, error }) => {
          if (loading) {
            return <Loader isCenter={true} />;
          }

          if (error) {
            return <ErrorMessage error={error} />;
          }

          return (
            <div id="App">
              <Profile currentUser={data.viewer} />
              <div className="search-repo">
                <Filter
                  onChange={handleQueryChange}
                  onChangeHandler={onChangeHandler}
                />
                <RepositoryList
                  data={data}
                  query={debouncedQuery}
                  filter={onChangeHandler}
                  currentUser={data.viewer}
                />
                <PublicRepositories
                  loading={loading}
                  currentUser={data.viewer}
                  query={debouncedQuery}
                  entry={'viewer'}
                />
              </div>
            </div>
          );
        }}
      </Query>
    </Fragment>
  );
};

export default App;
