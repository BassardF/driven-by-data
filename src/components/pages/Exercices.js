import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import NewExerciceModal from '../common/NewExerciceModal';
import Context from '../../context/context';

class InnerExercices extends Component {
  state = {
    open: false,
  };

  componentDidMount() {
    const { match } = this.props;
    this.props.selectSport(match && match.params && match.params.sport);
  }

  render() {
    return (
      <div>
        <NewExerciceModal
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
            <Context.Consumer>
              {state => (
                <Fragment>
                  {state.exercices &&
                    state.exercices.map(n => (
                      <TableRow key={n.id}>
                        <TableCell component="th" scope="row">
                          {n.name}
                        </TableCell>
                        <TableCell numeric>22</TableCell>
                        <TableCell numeric>22</TableCell>
                        <TableCell numeric>22</TableCell>
                      </TableRow>
                    ))}
                  <TableRow key="31">
                    <TableCell component="th" scope="row" colSpan={4}>
                      <button
                        onClick={() => {
                          this.setState({ open: true });
                        }}
                      >
                        + Add new exercice
                      </button>
                    </TableCell>
                  </TableRow>
                </Fragment>
              )}
            </Context.Consumer>
          </TableBody>
        </Table>
      </div>
    );
  }
}

InnerExercices.propTypes = {
  match: PropTypes.object,
  selectSport: PropTypes.func,
};

InnerExercices.defaultProps = {
  match: {},
  selectSport: () => {},
};

const Exercices = ({ match }) => (
  <Context.Consumer>
    {state => <InnerExercices match={match} selectSport={state.selectSport} />}
  </Context.Consumer>
);

Exercices.propTypes = {
  match: PropTypes.object,
};

Exercices.defaultProps = {
  match: {},
};

export default withRouter(Exercices);
