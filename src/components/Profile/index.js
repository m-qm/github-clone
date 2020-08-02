import React, { Fragment } from 'react';

import './Profile.css';

export default function Profile({ currentUser }) {
  const {
    avatarUrl,
    name,
    login,
    location,
    blog,
    bio,
    company,
    email,
  } = currentUser;
  return (
    <Fragment>
      <div id="info">
        <img src={avatarUrl} alt={avatarUrl} />
        <h1>
          <div className="name">{name}</div>
          <div className="username">{login}</div>
        </h1>
        <button appearance="default">Follow</button>
        <br />
        <div className="bio">{bio}</div>
        <button className="btn">Edit Bio</button>
        <div className="company">{company}</div>
        <div className="location">{location}</div>
        <div className="blog">{blog}</div>
        <div className="email">{email}</div>
      </div>
    </Fragment>
  );
}
