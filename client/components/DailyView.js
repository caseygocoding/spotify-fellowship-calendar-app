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
              <div key={event.id}>
                <span />
                <h3>{event.eventName} </h3>
                <ul className="list">
                  {event.startTime && event.endTime ? (
                    <li>
                      from {event.startTime} to {event.endTime}
                    </li>
                  ) : event.startTime && !event.endTime ? (
                    <li>from {event.startTime}</li>
                  ) : !event.startTime && event.endTime ? (
                    <li>to {event.endTime}</li>
                  ) : null}

                  {event.description ? (
                    <li>Details: ${event.description}</li>
                  ) : null}
                </ul>
              </div>
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
