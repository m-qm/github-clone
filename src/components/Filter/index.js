import React, { useEffect, useRef, Fragment } from 'react';
import './style.css';

const Filter = ({ onChange }) => {
  const dummyTabsList = [
    'Overview',
    'Repositories',
    'Stars',
    'Followers',
    'Following',
  ].map((list) => (
    <li key={list}>
      <a href="#">{list}</a>
    </li>
  ));

  let inputRef = useRef(null);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  });
  return (
    <Fragment>
      <div className="dummy-tabs">
        <ul>{dummyTabsList}</ul>
      </div>
      <form id="filter-repo" onChange={onChange}>
        <label className="search-field">
          <input
            className="input-field"
            ref={() => inputRef}
            maxLength={39}
            placeholder="type a repository name"
            type="text"
          />
        </label>
        <div className="button-wrapper">
          <button className="btn" onClick={(e) => e.preventDefault()}>
            New
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default Filter;
