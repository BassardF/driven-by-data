import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';

import NewRecordModal from '../common/modals/NewRecordModal';

import Context from '../../context/context';

class InnerRecords extends Component {
  state = {
    open: false,
  };

  componentDidMount() {
    const { match } = this.props;
    if (!this.props.selectedSport) {
      this.props.selectSport(match && match.params && match.params.sport);
    }
    this.props.selectExercice(match && match.params && match.params.exercice);
  }

  addRecord(newRecord) {
    this.props.addRecord(newRecord);
    this.setState({ open: false });
  }

  render() {
    const { exercices, selectedExercice } = this.props;
    const exercice =
      exercices && selectedExercice && exercices[selectedExercice];
    if (!exercice) return null;
    return (
      <div>
        <NewRecordModal
          exercice={exercice}
          addRecord={rec => this.addRecord(rec)}
          open={this.state.open}
          handleClose={() => {
            this.setState({ open: false });
          }}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Exercice</TableCell>
              <TableCell numeric>Dimensions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <Fragment>
              {exercices &&
                exercice.records &&
                exercice.records.map((n, index) => (
                  <TableRow key={`key-${index}`} onClick={() => 0}>
                    {exercice &&
                      exercice.dimensions &&
                      exercice.dimensions.map(dim => (
                        <TableCell
                          key={`key-sub-dim-${dim.name}-${index}`}
                          numeric
                        >
                          {dim.name ? n[dim.name] : ''}
                        </TableCell>
                      ))}
                  </TableRow>
                ))}
            </Fragment>
          </TableBody>
        </Table>

        <Button type="text" onClick={() => this.setState({ open: true })}>
          add
        </Button>
      </div>
    );
  }
}

InnerRecords.propTypes = {
  match: PropTypes.object,
  selectExercice: PropTypes.func,
  selectSport: PropTypes.func,
  addRecord: PropTypes.func,
  exercices: PropTypes.object,
  selectedExercice: PropTypes.string,
  selectedSport: PropTypes.string,
};

InnerRecords.defaultProps = {
  match: {},
  selectExercice: () => {},
  selectSport: () => {},
  addRecord: () => {},
  exercices: {},
  selectedExercice: null,
  selectedSport: null,
};

const Records = ({ match, history }) => (
  <Context.Consumer>
    {state => (
      <InnerRecords
        exercices={state.exercices}
        match={match}
        history={history}
        selectExercice={state.selectExercice}
        selectSport={state.selectSport}
        selectedSport={state.selectedSport}
        selectedExercice={state.selectedExercice}
        addRecord={state.addRecord}
      />
    )}
  </Context.Consumer>
);

Records.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

Records.defaultProps = {
  match: {},
  history: {},
};

export default withRouter(Records);
