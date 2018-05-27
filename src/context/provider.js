import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Context from './context';

import { fetchSports, addSport } from '../firebase/api/sport';
import { on } from '../firebase/api/exercice';

/* eslint-disable react/no-unused-state */
class AppProvider extends Component {
  state = {
    sports: [],
    selectedSport: null,
    refreshSportsList: async () => {
      this.setState({
        sports: await fetchSports(),
      });
    },
    unsubscribeSport: () => {
      if (this.state.unsubscribe) {
        this.state.unsubscribe();
        this.setState({
          selectedSport: null,
          unsubscribe: null,
        });
      }
    },
    selectSport: id => {
      if (id) {
        this.setState({
          selectedSport: id,
          unsubscribe: on(id, () => {}),
        });
      } else {
        this.state.unsubscribe();
      }
    },
    addSport: async name => {
      await addSport(name);
      this.state.refreshSportsList();
    },
  };

  componentDidMount() {
    this.state.refreshSportsList();
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default AppProvider;

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
