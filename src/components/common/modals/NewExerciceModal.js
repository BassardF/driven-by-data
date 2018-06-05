import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
  return {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    backgroundColor: 'white',
    padding: '30px',
  };
}

class NewExerciceModal extends React.Component {
  state = {
    exercice: '',
    dimensions: [{ name: '', dimension: 'count' }],
  };

  create() {
    this.props.addExercice({
      exercice: this.state.exercice,
      dimensions: this.state.dimensions,
    });
    this.setState({
      exercice: '',
      dimensions: [{ name: '', dimension: 'count' }],
    });
    this.props.handleClose();
  }

  render() {
    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={this.props.open}
        onClose={this.props.handleClose}
      >
        <div style={getModalStyle()} className="">
          <Typography variant="title" id="modal-title">
            Add a new exercice
          </Typography>
          <Typography variant="subheading" id="simple-modal-description">
            <input
              value={this.state.exercice}
              onChange={e => this.setState({ exercice: e.target.value })}
              type="text"
              placeholder="Exercice name"
            />

            {this.state.dimensions.map((dim, index) => (
              <div key={`key-new-ex-${index}`}>
                <input
                  type="text"
                  value={dim.name}
                  onChange={e => {
                    const { dimensions } = this.state;
                    dimensions[index].name = e.target.value;
                    this.setState({ dimensions });
                  }}
                  placeholder={`dimension ${index + 1}`}
                />
                <select
                  value={dim.dimension}
                  onChange={e => {
                    const { dimensions } = this.state;
                    dimensions[index].dimension = e.target.value;
                    this.setState({ dimensions });
                  }}
                >
                  <option value="count">count</option>
                  <option value="distance">distance</option>
                  <option value="time">time</option>
                  <option value="other">other</option>
                </select>
              </div>
            ))}

            <button
              onClick={() => {
                const { dimensions } = this.state;
                dimensions.push({ name: '', dimension: 'count' });
                this.setState({ dimensions });
              }}
            >
              + dimension
            </button>

            <button onClick={() => this.create()}>+ create</button>
          </Typography>
        </div>
      </Modal>
    );
  }
}

NewExerciceModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  addExercice: PropTypes.func.isRequired,
};

export default NewExerciceModal;
