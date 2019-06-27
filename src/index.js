/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 *
 * DONE
 *   Turn Order = ANY
 *   Game ID
 *   Secret State
 *
 * TO DO
 *   Point System (Apply Phases)
 *   Support more than 2 players
 *   Lobby
 *   Card game framework
 *   add AI
 */

import React from "react";
import PropTypes from "prop-types";
import { render } from "react-dom";
import { Client } from "boardgame.io/react";
import { RPS } from "./game";
import { RPSBoard } from "./board";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));
const RPSClient = Client({
  game: RPS,
  board: RPSBoard,
  multiplayer: { local: true }
});

export default function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Player One" />
          <Tab label="Player Two" />
        </Tabs>
      </AppBar>
      {value === 0 && (
        <TabContainer>
          <Typography variant="h6" color="inherit">
            <RPSClient playerID="0" gameID="first_game" />
          </Typography>
        </TabContainer>
      )}
      {value === 1 && (
        <TabContainer>
          <Typography variant="h6" color="inherit">
            <RPSClient playerID="1" gameID="first_game" />
          </Typography>
        </TabContainer>
      )}
    </div>
  );
}

render(<App />, document.getElementById("root"));
