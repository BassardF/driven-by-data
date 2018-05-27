import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GridListTile from '@material-ui/core/GridListTile';
import Context from '../../context/context';

class SportTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      label: '',
    };
  }

  render() {
    const { sport } = this.props;
    return sport ? (
      <GridListTile key="key" cols={1}>
        <Link to={`${sport.name}/exercices`} href={`${sport.name}/exercices`}>
          <div>{sport.name}</div>
        </Link>
      </GridListTile>
    ) : (
      <GridListTile key="key" cols={1}>
        <Context.Consumer>
          {state => (
            <Fragment>
              <input
                value={this.state.label}
                onChange={e => this.setState({ label: e.target.value })}
                type="text"
                placeholder="Any sport"
              />
              <button onClick={() => state.addSport(this.state.label)}>
                add
              </button>
            </Fragment>
          )}
        </Context.Consumer>
      </GridListTile>
    );
  }
}

SportTile.propTypes = {
  sport: PropTypes.object,
};

SportTile.defaultProps = {
  sport: null,
};

export default SportTile;
