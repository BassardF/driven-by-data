import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

function getModalStyle() {
  return {
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    backgroundColor: 'white',
    padding: '30px',
  };
}

class NewExerciceModal extends React.Component {
  state = {
    newRecord: {},
  };

  changeNewRecordValue(e, dim) {
    const { newRecord } = this.state;
    newRecord[dim] = e.target.value;
    this.setState({
      newRecord,
    });
  }

  render() {
    const { exercice } = this.props;
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.open}
        onClose={this.props.handleClose}
      >
        <div style={getModalStyle()} className="">
          <Typography variant="display1" gutterBottom>
            New Record
          </Typography>
          {exercice &&
            exercice.dimensions &&
            exercice.dimensions.map(dim => (
              <div key={`key-dim-${dim.name}`}>
                <TextField
                  type="text"
                  label={dim.name}
                  value={this.state.newRecord[dim.name] || ''}
                  onChange={e => this.changeNewRecordValue(e, dim.name)}
                  margin="normal"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {dim.dimension}
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            ))}
          <div key="key-dim-data">
            <TextField
              label="Date"
              type="date"
              fullWidth
              value={this.state.newRecord.date || ''}
              onChange={e => this.changeNewRecordValue(e, 'date')}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <Button
              type="text"
              color="primary"
              size="small"
              variant="raised"
              onClick={() => {
                this.props.addRecord(this.state.newRecord);
                this.setState({ newRecord: {} });
              }}
            >
              add
            </Button>
            <Button
              type="text"
              color="default"
              size="small"
              style={{ float: 'right' }}
              onClick={this.props.handleClose}
            >
              close
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

NewExerciceModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  addRecord: PropTypes.func.isRequired,
  exercice: PropTypes.object.isRequired,
};

export default NewExerciceModal;
