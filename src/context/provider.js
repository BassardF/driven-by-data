import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Context from './context';

import { fetchSports, addSport } from '../firebase/api/sport';
import { on, setExercices } from '../firebase/api/exercice';

/* eslint-disable react/no-unused-state */
class AppProvider extends Component {
  state = {
    // List of sport available
    sports: [],
    // Selected sport
    selectedSport: null,
    // List of exercices available
    exercices: {},
    // Selected exercice
    selectedExercice: null,
    // Refresh the list of sports
    refreshSportsList: async () => {
      this.setState({
        sports: await fetchSports(),
      });
    },
    // Deselect and unsubscribe to the current/last sport
    unsubscribeSport: () => {
      if (this.state.unsubscribe) {
        this.state.unsubscribe();
        this.setState({
          selectedSport: null,
          selectedExercice: null,
          unsubscribe: null,
        });
      }
    },
    // Select a sport, create a live connexion with the sport (exercices)
    selectSport: id => {
      if (id) {
        this.setState({
          selectedSport: id,
          unsubscribe: on(id, doc => {
            this.setState({ exercices: doc.exercices });
          }),
        });
      } else {
        this.state.unsubscribe();
      }
    },
    // Select an exercice
    selectExercice: id => {
      if (id) {
        this.setState({
          selectedExercice: id,
        });
      }
    },
    // Select an exercice
    unSelectExercice: () => {
      this.setState({
        selectedExercice: null,
      });
    },
    // Add a new sport
    addSport: async name => {
      await addSport(name);
      this.state.refreshSportsList();
    },
    // Add a new exercice
    addExercice: ex => {
      setExercices(this.state.selectedSport, {
        ...this.state.exercices,
        [ex.exercice]: ex,
      });
    },
    // Add a new Record
    addRecord: record => {
      const { selectedSport, selectedExercice, exercices } = this.state;
      if (
        selectedSport &&
        selectedExercice &&
        record &&
        exercices[selectedExercice]
      ) {
        exercices[selectedExercice].records =
          exercices[selectedExercice].records || [];
        exercices[selectedExercice].records.push(record);
        setExercices(selectedSport, exercices);
      }
    },
  };

  componentDidMount() {
    this.state.refreshSportsList();
  }

  componentDidUpdate() {
    console.log('state', this.state);
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
