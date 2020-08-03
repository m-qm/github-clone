import React, { Fragment } from 'react';

import './Profile.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faStar,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

// Some properties are hardcoded as they are not
// specified in my gitProfile

export default function Profile({ currentUser }) {
  const {
    avatarUrl,
    // name,
    // login,
    location,
    blog,
    // bio,
    company,
    // totalStarCount,
    // followers,
    // following,
    // stars,
    // email,
  } = currentUser;
  console.log(currentUser);
  return (
    <Fragment>
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
            19 <FontAwesomeIcon icon={faStar} />
          </div>
          <div className="following">67 following</div>
          <div className="users">
            69
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
    </Fragment>
  );
}
