import React from "react";
import ReactDOM from "react-dom";
import ResourcePanel from "./resource_panel";
import PlayerBoard from "./player_board";

export default class PlayerPanel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    if(!this.props.json_data){
      return <div/>
    }

    return (
    <div>
      <div>Score:{this.props.json_data.score}</div>
      <ResourcePanel resources={this.props.json_data.resources} />
      <PlayerBoard board={this.props.json_data.board} />
    </div>
    );
  }
}
