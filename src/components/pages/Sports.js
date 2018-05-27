import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';

import Context from '../../context/context';
import SportTile from '../common/SportTile';

class InnerSports extends Component {
  componentDidMount() {
    this.props.unsubscribeSport();
  }

  render() {
    return (
      <Context.Consumer>
        {state => (
          <GridList cellHeight={160} className="grid" cols={3}>
            {state.sports &&
              state.sports.map(sport => (
                <SportTile key={sport.id} sport={sport} />
              ))}
            <SportTile />
          </GridList>
        )}
      </Context.Consumer>
    );
  }
}

InnerSports.propTypes = {
  unsubscribeSport: PropTypes.func,
};

InnerSports.defaultProps = {
  unsubscribeSport: () => {},
};

const Sports = () => (
  <Context.Consumer>
    {state => <InnerSports unsubscribeSport={state.unsubscribeSport} />}
  </Context.Consumer>
);

export default Sports;
