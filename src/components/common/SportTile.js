import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
      <Link
        to={`sports/${sport.name}/exercices`}
        href={`sports/${sport.name}/exercices`}
      >
        <div>{sport.name}</div>
      </Link>
    ) : (
      <Context.Consumer>
        {state => (
          <Fragment>
            <TextField
              value={this.state.label}
              onChange={e => this.setState({ label: e.target.value })}
              type="text"
              id="sport"
              label="Name of the sport"
              margin="normal"
              placeholder="eg: cycling"
            />
            <Button onClick={() => state.addSport(this.state.label)}>
              add
            </Button>
          </Fragment>
        )}
      </Context.Consumer>
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
