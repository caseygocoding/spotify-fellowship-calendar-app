import React, {Component} from 'react'
import {Message} from 'semantic-ui-react'
import {connect} from 'react-redux'
import dateFns from 'date-fns'

class DailyView extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const fullDate = this.props.date
    const {events} = this.props

    let formattedMonth = Number(
      dateFns.format(fullDate, 'MM/DD/YYYY').split('/')[0]
    )
    let formattedYear = Number(
      dateFns.format(fullDate, 'MM/DD/YYYY').split('/')[2]
    )
    let formattedDay = Number(
      dateFns.format(fullDate, 'MM/DD/YYYY').split('/')[1]
    )

    let filteredEvent = events.filter(event => event.day === formattedDay)

    return (
      <Message positive>
        <Message.Header>
          Events on {formattedMonth}/{formattedDay}/{formattedYear}
        </Message.Header>
        {events.length
          ? events.map(event => {
              return event.day === formattedDay ? (
                <p key={event.id}>
                  <span>{event.eventName} </span>
                  <span>{`
                  from ${event.startTime} to ${event.endTime}
                  Details: ${event.description}
                `}</span>
                </p>
              ) : null
            })
          : null}
        {!filteredEvent.length ? (
          <p>There are currently no events on this date</p>
        ) : null}
      </Message>
    )
  }
}

const mapState = state => {
  return {
    events: state.events,
    dailyEvents: state.dailyEvents,
    date: state.date
  }
}

export default connect(mapState)(DailyView)
