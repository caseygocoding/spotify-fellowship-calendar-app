import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';

const NavBar = () => (
  <Grid columns="equal" divided inverted>
    <Grid.Row color="green" textAlign="center">
      <Grid.Column>
        <Segment color="green" inverted>
          Awesome calendar app
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment color="green" inverted>
          Welcome Spotify
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment color="green" inverted>
          Casey Chan
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default NavBar;
