import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Button from '@material-ui/core/Button';

import NewExerciceModal from '../common/modals/NewExerciceModal';
import Context from '../../context/context';

class InnerExercices extends Component {
  state = {
    open: false,
  };

  componentDidMount() {
    const { match } = this.props;
    this.props.selectSport(match && match.params && match.params.sport);
    this.props.unSelectExercice();
  }

  goToExercices(name) {
    const { match, history } = this.props;
    history.push(`/sports/${match.params.sport}/exercices/${name}`);
  }

  render() {
    return (
      <div>
        <Context.Consumer>
          {state => (
            <Fragment>
              <NewExerciceModal
                addExercice={state.addExercice}
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
                    <TableCell numeric>Current best</TableCell>
                    <TableCell numeric>Current goal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <Fragment>
                    {state.exercices &&
                      Object.keys(state.exercices).map(n => (
                        <TableRow
                          key={state.exercices[n].exercice}
                          onClick={() =>
                            this.goToExercices(state.exercices[n].exercice)
                          }
                        >
                          <TableCell component="th" scope="row">
                            {state.exercices[n].exercice}
                            {state.exercices[n].dimension}
                          </TableCell>
                          <TableCell numeric>22</TableCell>
                          <TableCell numeric>22</TableCell>
                          <TableCell numeric>22</TableCell>
                        </TableRow>
                      ))}
                    <TableRow key="31">
                      <TableCell component="th" scope="row" colSpan={4}>
                        <Button
                          onClick={() => {
                            this.setState({ open: true });
                          }}
                        >
                          + Add new exercice
                        </Button>
                      </TableCell>
                    </TableRow>
                  </Fragment>
                </TableBody>
              </Table>
            </Fragment>
          )}
        </Context.Consumer>
      </div>
    );
  }
}

InnerExercices.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  selectSport: PropTypes.func,
  unSelectExercice: PropTypes.func,
};

InnerExercices.defaultProps = {
  match: {},
  history: {},
  selectSport: () => {},
  unSelectExercice: () => {},
};

const Exercices = ({ match, history }) => (
  <Context.Consumer>
    {state => (
      <InnerExercices
        match={match}
        history={history}
        selectSport={state.selectSport}
        unSelectExercice={state.unSelectExercice}
      />
    )}
  </Context.Consumer>
);

Exercices.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
};

Exercices.defaultProps = {
  match: {},
  history: {},
};

export default withRouter(Exercices);
