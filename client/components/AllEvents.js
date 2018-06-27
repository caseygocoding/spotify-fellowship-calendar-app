import React from 'react';
import { Table } from 'semantic-ui-react';

const AllEvents = props => (
  <Table striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Event Name</Table.HeaderCell>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.HeaderCell>Time</Table.HeaderCell>
        <Table.HeaderCell>Description</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {props.events &&
        props.events.map(event => {
          return (
            <Table.Row key={event.id}>
              <Table.Cell>{event.eventName}</Table.Cell>
              <Table.Cell>
                {event.month}/{event.day}/{event.year}
              </Table.Cell>
              <Table.Cell>
                {event.startTime} - {event.endTime}
              </Table.Cell>
              <Table.Cell>{event.description}</Table.Cell>
            </Table.Row>
          );
        })}
    </Table.Body>
  </Table>
);

export default AllEvents;
