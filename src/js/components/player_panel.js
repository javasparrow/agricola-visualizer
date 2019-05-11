import React from "react";
import ReactDOM from "react-dom";
import ResourcePanel from "./resource_panel";
import PlayerBoard from "./player_board";
import { player_colors } from "../consts/colors";

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
      <div style={{color: player_colors[this.props.json_data.player_id]}}>{
        this.props.json_data.families.map((family) => {
          if(family.family_type == "in_house"){
            return "●"
          } else {
            return ""
          }
        })
      }</div>
      <div>Score:{this.props.json_data.score}</div>
      <div>Begging:{this.props.json_data.begging_cards}</div>
      <ResourcePanel resources={this.props.json_data.resources} />
      <PlayerBoard board={this.props.json_data.board} fences={this.props.json_data.fences} />
    </div>
    );
  }
}
