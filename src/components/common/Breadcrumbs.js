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
                    to={`/sports/${state.selectedSport}/exercices`}
                    href={`/sports/${state.selectedSport}/exercices`}
                  >
                    {state.selectedSport}
                  </Link>
                </Fragment>
              )}
              {state.selectedExercice && (
                <Fragment>
                  <span> / </span>
                  <Link
                    to={`/sports/${state.selectedSport}/exercices/${
                      state.selectedExercice
                    }`}
                    href={`/sports/${state.selectedSport}/exercices/${
                      state.selectedExercice
                    }`}
                  >
                    {state.selectedExercice}
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
