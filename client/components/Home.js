import React from 'react';
import { connect } from 'react-redux';
import Calendar from './Calendar';
import NavBar from './NavBar';
import { Segment } from 'semantic-ui-react';

export const Home = () => {
  return (
    <div>
      <NavBar />
      <Segment id="segment">
        <Calendar />
      </Segment>
    </div>
  );
};

export default connect()(Home);
