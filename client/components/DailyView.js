import React from 'react';
import { Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { MonthinNum, YearinNum, DayinNum } from './helperFunctions';

function DailyView({ events, date }) {
  const fullDate = date;
  const formattedMonth = MonthinNum(fullDate);
  const formattedYear = YearinNum(fullDate);
  const formattedDay = DayinNum(fullDate);
  const filteredEvent = events.filter(event => event.day === formattedDay);

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
                <span>
                  {`
                  from ${event.startTime} to ${event.endTime}
                  Details: ${event.description}
                  `}
                </span>
              </p>
            ) : null;
          })
        : null}
      {!filteredEvent.length ? (
        <p>There are currently no events on this date</p>
      ) : null}
    </Message>
  );
}

const mapState = state => {
  return {
    events: state.events,
    dailyEvents: state.dailyEvents,
    date: state.date,
  };
};

export default connect(mapState)(DailyView);
