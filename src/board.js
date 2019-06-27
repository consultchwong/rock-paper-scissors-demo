/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from "react";
import PropTypes from "prop-types";
import "./board.css";
import Button from "@material-ui/core/Button";

class ButtonGroup extends React.Component {
  render() {
    var isPlayed = this.props.isPlayed;
    var isActive = this.props.isActive;
    var selectedButton = this.props.selectedButton;
    var buttonColor = ["gre️y", "grey", "grey"];
    var buttonIcon = ["⛰️", "📝", "✂️"];
    console.log("ButtonGroup isPlayed", isPlayed);
    console.log("ButtonGroup isActive", isActive);
    console.log("ButtonGroup selectedButton", selectedButton);
    buttonColor = buttonColor.map((val, idx) => {
      if (isPlayed) {
        if (!selectedButton) {
          return "secondary";
        } else if (idx === selectedButton) {
          return "primary";
        } else {
          return "default";
        }
      } else {
        return "primary";
      }
    });
    const buttonList = buttonIcon.map((val, idx) => (
      <Button
        variant="contained"
        size="small"
        color={buttonColor[idx]}
        style={{ margin: 8, padding: 8 }}
        onClick={() => this.props.onClick(idx)}
        key={val}
      >
        {val}
      </Button>
    ));
    return <React.Fragment>{buttonList}</React.Fragment>;
  }
}

export class RPSBoard extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool
  };

  onClick = action => {
    console.log("onClick", action);
    //    this.props.moves.takeAction(action);
    this.props.moves.takePlayerAction(this.props.playerID, action);
  };

  render() {
    console.log("render", this.props.ctx);
    console.log("render", this.props.G);
    console.log("render", this.props.playerID);
    console.log("render isActive", this.props.isActive);
    console.log(
      "render this.props.G.actions[this.props.ctx.currentPlayer]",
      this.props.G.actions[this.props.playerID]
    );

    var youID = this.props.playerID ? this.props.playerID : 0;
    var opponentID = this.props.playerID
      ? this.props.playerID == 0
        ? 1
        : 0
      : 1;
    var isGameOver = "gameover" in this.props.ctx;

    return (
      <React.Fragment>
        <div>Game Rules:</div>
        <div>"⛰️" = Stone, "📝" = Paper, "✂️" = Scissors</div>
        <div>"⛰️" > "✂️" > "📝" > "⛰️"</div>
        <div>
          {this.props.playerID ? "You" : ""} Player {youID}
        </div>
        <ButtonGroup
          onClick={this.onClick}
          isGameOver={isGameOver}
          isPlayed={this.props.G.actions[youID] != null ? true : false}
          selectedButton={this.props.G.players[youID.toString()]}
        />
        <div>
          {this.props.playerID ? "Opponent" : ""} Player
          {opponentID}
          {isGameOver ? "game over" : ""}
        </div>
        <ButtonGroup
          isGameOver={isGameOver}
          isPlayed={this.props.G.actions[opponentID] != null ? true : false}
          selectedButton={
            isGameOver
              ? this.props.ctx.gameover.finalview[opponentID.toString()]
              : null
          }
        />
        <div>
          {"gameover" in this.props.ctx
            ? "winner" in this.props.ctx.gameover
              ? "winner is player " + this.props.ctx.gameover.winner
              : "draw"
            : ""}
        </div>
      </React.Fragment>
    );
  }
}
