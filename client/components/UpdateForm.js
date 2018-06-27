import React, { Component } from 'react';
import dateFns from 'date-fns';
import { connect } from 'react-redux';
import { updateSingleEvent, deleteSingleEvent } from '../store';
import { Button, Modal, Form, TextArea } from 'semantic-ui-react';
import { transFormtimeOptions } from './helperFunctions';

const timeOptions = transFormtimeOptions;

const ampmOptions = [
  { key: 'am', text: 'AM', value: 'am' },
  { key: 'pm', text: 'PM', value: 'pm' },
];

class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      startTime: '',
      startTimeAMPM: '',
      endTime: '',
      endTimeAMPM: '',
      update: false,
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUpdateOff = this.handleUpdateOff.bind(this);
  }

  handleSelectChange(event, { name, value }) {
    if (name === 'startTime') {
      this.setState({ startTime: value });
    } else if (name === 'startTimeAMPM') {
      this.setState({ startTimeAMPM: value });
    } else if (name === 'endTime') {
      this.setState({ endTime: value });
    } else if (name === 'endTimeAMPM') {
      this.setState({ endTimeAMPM: value });
    }
  }
  handleOpen() {
    this.setState({ modalOpen: true });
  }
  handleClose() {
    this.setState({ modalOpen: false });
  }
  handleDelete(id) {
    this.props.deleteSingleEvent(id);
  }
  handleUpdate() {
    this.setState({ update: true });
  }
  handleUpdateOff() {
    this.setState({ update: false });
  }

  render() {
    const fullDate = dateFns.format(this.props.selectedDate, 'MM/DD/YYYY');
    const { handleSubmit } = this.props;

    return (
      <Modal
        key={this.props.event.id}
        trigger={
          <a>
            <div onClick={this.handleOpen}>{this.props.event.eventName}</div>
          </a>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        className="scrolling"
      >
        <Modal.Header>Edit Event on {fullDate}</Modal.Header>
        <Modal.Content image>
          {!this.state.update ? null : (
            <i aria-hidden="true" className="write massive icon" />
          )}
          {this.state.update ? (
            <Form
              onSubmit={event =>
                handleSubmit(
                  event,
                  this.props.event.id,
                  fullDate,
                  this.handleClose,
                  this.handleUpdateOff
                )
              }
            >
              <Form.Input
                label="Event name"
                required
                placeholder={this.props.event.eventName}
                name="eventName"
              />
              <Form.Group widths="equal">
                <Form.Select
                  label="Start Time"
                  options={timeOptions}
                  name="startTime"
                  onChange={this.handleSelectChange}
                />
                <Form.Select
                  label="AM/PM"
                  options={ampmOptions}
                  name="startTimeAMPM"
                  onChange={this.handleSelectChange}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Select
                  label="End Time"
                  options={timeOptions}
                  name="endTime"
                  onChange={this.handleSelectChange}
                />
                <Form.Select
                  label="AM/PM"
                  options={ampmOptions}
                  name="endTimeAMPM"
                  onChange={this.handleSelectChange}
                />
              </Form.Group>
              <Form.Input
                style={{ display: 'none' }}
                name="startTime"
                value={this.state.startTime}
              />
              <Form.Input
                style={{ display: 'none' }}
                name="startTimeAMPM"
                value={this.state.startTimeAMPM}
              />
              <Form.Input
                style={{ display: 'none' }}
                name="endTime"
                value={this.state.endTime}
              />
              <Form.Input
                style={{ display: 'none' }}
                name="endTimeAMPM"
                value={this.state.endTimeAMPM}
              />
              <Form.Field
                control={TextArea}
                label="Event details"
                placeholder={this.props.event.description}
                name="description"
              />
              <Button type="submit">Submit</Button>
            </Form>
          ) : null}

          <div id="updatebox">
            {!this.state.update ? (
              <div className="ui success message">
                <div className="header">{this.props.event.eventName}</div>
                <ul className="list">
                  {this.props.event.startTime && this.props.event.endTime ? (
                    <li>
                      Time: from {this.props.event.startTime} to{' '}
                      {this.props.event.endTime}
                    </li>
                  ) : this.props.event.startTime &&
                  !this.props.event.endTime ? (
                    <li>Time: from {this.props.event.startTime}</li>
                  ) : !this.props.event.startTime &&
                  this.props.event.endTime ? (
                    <li>Time: to {this.props.event.endTime}</li>
                  ) : null}

                  {this.props.event.description ? (
                    <li>Details: {this.props.event.description}</li>
                  ) : null}
                </ul>
              </div>
            ) : null}

            <span />

            {!this.state.update ? (
              <Button.Group id="updateButton">
                <Button
                  size="big"
                  positive
                  type="submit"
                  onClick={this.handleUpdate}
                >
                  Update
                </Button>
                <Button.Or size="massive" />
                <Button
                  size="big"
                  negative
                  type="submit"
                  onClick={() => this.handleDelete(this.props.event.id)}
                >
                  Delete
                </Button>
              </Button.Group>
            ) : null}
          </div>

          {/* {!this.state.update ? (
            <Button type="submit" onClick={this.handleUpdate}>
              Update
            </Button>
          ) : null}

          {!this.state.update ? (
            <Button
              type="submit"
              onClick={() => this.handleDelete(this.props.event.id)}
            >
              Delete
            </Button>
          ) : null} */}
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleClose} inverted>
            Close!
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapState = state => {
  return {
    events: state.events,
    selectedDate: state.date,
  };
};
const mapDispatch = dispatch => {
  return {
    handleSubmit: (event, id, fulldate, handleClose, handleUpdateOff) => {
      event.preventDefault();
      const eventName = event.target.eventName.value;
      const startTime =
        event.target.startTime.value + event.target.startTimeAMPM.value;
      const endTime =
        event.target.endTime.value + event.target.endTimeAMPM.value;
      const description = event.target.description.value;
      const year = Number(fulldate.split('/')[2]);
      const month = Number(fulldate.split('/')[0]);
      const day = Number(fulldate.split('/')[1]);

      dispatch(
        updateSingleEvent(id, {
          eventName,
          startTime,
          endTime,
          description,
          year,
          month,
          day,
        })
      );
      handleUpdateOff();
      handleClose();
    },
    deleteSingleEvent: id => {
      dispatch(deleteSingleEvent(id));
    },
  };
};
export default connect(
  mapState,
  mapDispatch
)(UpdateForm);
