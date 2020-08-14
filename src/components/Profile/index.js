import React, { Fragment } from 'react';

import './style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faStar,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loader from '../Loader';

import ErrorMessage from '../ErrorMessage';

// Some properties are hardcoded as they are not
// specified in my gitProfile

const USER_QUERY = gql`
  {
    user(login: "m-qm") {
      followers(first: 100) {
        totalCount
      }
      starredRepositories(first: 100) {
        totalCount
      }
      following {
        totalCount
      }
    }
  }
`;

export default function Profile({ currentUser }) {
  const { avatarUrl, location, blog, company } = currentUser;
  return (
    <Fragment>
      <Query query={USER_QUERY} notifyOnNetworkStatusChange={true}>
        {({ data, loading, error }) => {
          if (loading) {
            return <Loader isCenter={true} />;
          }

          if (error) {
            return <ErrorMessage error={error} />;
          }
          return (
            <div id="info">
              <img src={avatarUrl} alt={avatarUrl} />
              <h1>
                <div className="name">Mireia Querol</div>
                <div className="username">@m-qm</div>
              </h1>
              <div className="bio">Frontend Developer</div>
              <button appearance="default">Follow</button>

              <div className="secondary-info-wrapper">
                <div className="star">
                  {data.user.starredRepositories.totalCount} <FontAwesomeIcon icon={faStar} />
                </div>
                <div className="following">
                  {data.user.following.totalCount} following
                </div>
                <div className="users">
                  {data.user.followers.totalCount}
                  <FontAwesomeIcon icon={faUsers} />
                </div>
              </div>
              {company && <div className="company">{company}</div>}
              {location && <div className="location">{location}</div>}
              {blog && <div className="blog">{blog}</div>}

              <div className="email-wrapper">
                <FontAwesomeIcon icon={faEnvelope} />
                <div className="email">mireiaquerol@gmail.com</div>
              </div>

              <div className="organizations"></div>
            </div>
          );
        }}
      </Query>
    </Fragment>
  );
}
