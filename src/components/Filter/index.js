import React, { useEffect, useRef, Fragment } from 'react';
import './style.css';

const Filter = ({ onChange, repositoryCount }) => {
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

  const typeOptions = [
    'All',
    'Public',
    'Private',
    'Source',
    'Fork',
    'Archived',
    'Mirrors',
  ].map((type) => (
    <option value={type.toLowerCase()} key={type}>
      {type}
    </option>
  ));

  let inputRef = useRef(null);
  console.log(repositoryCount);

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
        <div className="select">
          <label className="select-type">
            Type:
            <select name="" id="type">
              {typeOptions}
            </select>
          </label>
          <button className="btn" onClick={(e) => e.preventDefault()}>
            New
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default Filter;
