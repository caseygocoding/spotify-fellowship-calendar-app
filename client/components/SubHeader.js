import React, {Component} from 'react'
import {Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {updateView} from '../store/views'

class SubHeader extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e, {name}) {
    //sets its local state and then dispatches to update the state in the store
    this.props.viewChange(name)
  }

  render() {
    return (
      <div>
        <Button.Group widths="5">
          <Button onClick={this.handleClick} name="allEvents">
            All Events
          </Button>
          <Button onClick={this.handleClick} name="monthly">
            Monthly View
          </Button>
          <Button onClick={this.handleClick} name="daily">
            Daily View
          </Button>
        </Button.Group>
      </div>
    )
  }
}

const mapState = () => {
  // return {
  //   events: state.events
  // }
}

const mapDispatch = dispatch => {
  return {
    viewChange: view => {
      dispatch(updateView(view))
    }
  }
}

export default connect(null, mapDispatch)(SubHeader)
