import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../context/context';

class Breadcrumbs extends Component {
  render() {
    return (
      <div style={{ padding: '20px' }}>
        <Link to="/" href="/">
          Sports
        </Link>
        <Context.Consumer>
          {state => (
            <Fragment>
              {state.selectedSport && (
                <Fragment>
                  <span> / </span>
                  <Link
                    to={`/${state.selectedSport}/exercices`}
                    href={`/${state.selectedSport}/exercices`}
                  >
                    {state.selectedSport}
                  </Link>
                </Fragment>
              )}
            </Fragment>
          )}
        </Context.Consumer>
      </div>
    );
  }
}

export default Breadcrumbs;
