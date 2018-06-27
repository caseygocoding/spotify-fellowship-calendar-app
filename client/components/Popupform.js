import React, {Component} from 'react'
import dateFns from 'date-fns'
import {connect} from 'react-redux'
import {addEvent} from '../store'
import {Button, Modal, Form, TextArea} from 'semantic-ui-react'

const timeOptions = [
  {key: '100', text: '1:00', value: '1:00'},
  {key: '130', text: '1:30', value: '1:30'},
  {key: '200', text: '2:00', value: '2:00'},
  {key: '230', text: '2:30', value: '2:30'},
  {key: '300', text: '3:00', value: '3:00'},
  {key: '330', text: '3:30', value: '3:30'},
  {key: '400', text: '4:00', value: '4:00'},
  {key: '430', text: '4:30', value: '4:30'},
  {key: '500', text: '5:00', value: '5:00'},
  {key: '530', text: '5:30', value: '5:30'},
  {key: '600', text: '6:00', value: '6:00'},
  {key: '630', text: '6:30', value: '6:30'},
  {key: '700', text: '7:00', value: '7:00'},
  {key: '730', text: '7:30', value: '7:30'},
  {key: '800', text: '8:00', value: '8:00'},
  {key: '830', text: '8:30', value: '8:30'},
  {key: '900', text: '9:00', value: '9:00'},
  {key: '930', text: '9:30', value: '9:30'},
  {key: '1000', text: '10:00', value: '10:00'},
  {key: '1030', text: '10:30', value: '10:30'},
  {key: '1100', text: '11:00', value: '11:00'},
  {key: '1130', text: '11:30', value: '11:30'},
  {key: '1200', text: '12:00', value: '12:00'},
  {key: '1230', text: '12:30', value: '12:30'}
]

const ampmOptions = [
  {key: 'am', text: 'AM', value: 'am'},
  {key: 'pm', text: 'PM', value: 'pm'}
]

class Popupform extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false,
      startTime: '',
      startTimeAMPM: '',
      endTime: '',
      endTimeAMPM: ''
    }

    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleSelectChange(e, {name, value}) {
    if (name === 'startTime') {
      this.setState({
        startTime: value
      })
    } else if (name === 'startTimeAMPM') {
      this.setState({
        startTimeAMPM: value
      })
    } else if (name === 'endTime') {
      this.setState({
        endTime: value
      })
    } else if (name === 'endTimeAMPM') {
      this.setState({
        endTimeAMPM: value
      })
    }
  }
  handleOpen() {
    this.setState({modalOpen: true})
  }
  handleClose() {
    this.setState({modalOpen: false})
  }

  render() {
    const fullDate = dateFns.format(this.props.selectedDate, 'MM/DD/YYYY')
    const {handleSubmit} = this.props

    return (
      <Modal
        trigger={
          <Button
            onClick={this.handleOpen}
            className="ui green tiny inverted button"
          >
            <i aria-hidden="true" className="add icon" />
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        className="scrolling"
      >
        <Modal.Header>Add Event on {fullDate}</Modal.Header>
        <Modal.Content image>
          <i aria-hidden="true" className="write massive icon" />
          <Form
            onSubmit={event => handleSubmit(event, fullDate, this.handleClose)}
          >
            <Form.Input
              label="Event name"
              required
              placeholder="Event Name"
              name="eventName"
            />
            <Form.Group widths="equal">
              <Form.Select
                required
                label="Start Time"
                options={timeOptions}
                name="startTime"
                onChange={this.handleSelectChange}
              />
              <Form.Select
                required
                label="AM/PM"
                options={ampmOptions}
                name="startTimeAMPM"
                onChange={this.handleSelectChange}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Select
                required
                label="End Time"
                options={timeOptions}
                name="endTime"
                onChange={this.handleSelectChange}
              />
              <Form.Select
                required
                label="AM/PM"
                options={ampmOptions}
                name="endTimeAMPM"
                onChange={this.handleSelectChange}
              />
            </Form.Group>
            <Form.Input
              style={{display: 'none'}}
              name="startTime"
              value={this.state.startTime}
            />
            <Form.Input
              style={{display: 'none'}}
              name="startTimeAMPM"
              value={this.state.startTimeAMPM}
            />
            <Form.Input
              style={{display: 'none'}}
              name="endTime"
              value={this.state.endTime}
            />
            <Form.Input
              style={{display: 'none'}}
              name="endTimeAMPM"
              value={this.state.endTimeAMPM}
            />
            <Form.Field
              control={TextArea}
              label="Event details"
              placeholder="Tell us more about the event..."
              name="description"
            />
            <Button type="submit">Submit</Button>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleClose} inverted>
            Close!
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapState = state => {
  return {
    events: state.events,
    selectedDate: state.date
  }
}
const mapDispatch = dispatch => {
  return {
    handleSubmit: (event, fulldate, handleClose) => {
      event.preventDefault()
      const eventName = event.target.eventName.value
      const startTime =
        event.target.startTime.value + event.target.startTimeAMPM.value
      const endTime =
        event.target.endTime.value + event.target.endTimeAMPM.value
      const description = event.target.description.value
      const year = Number(fulldate.split('/')[2])
      const month = Number(fulldate.split('/')[0])
      const day = Number(fulldate.split('/')[1])

      dispatch(
        addEvent({
          eventName,
          startTime,
          endTime,
          description,
          year,
          month,
          day
        })
      )
      handleClose()
    }
  }
}
export default connect(mapState, mapDispatch)(Popupform)
