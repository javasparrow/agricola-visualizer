import React from "react";
import ReactDOM from "react-dom";
import Resource from "./resource";
import { player_colors } from "../consts/colors";

const round_card_style = {
  width: 80,
  height: 120,
  border: "1px solid black",
  display: "inline-block",
  margin: 10,
  textPverflow: "ellipsis",
  overflow: "hidden"
}

const default_card_order = [
  "FarmExpansion", 
  "MeetingPlace", 
  "GrainSeeds", 
  "Farmland", 
  "DayLaborer", 
  "Forest", 
  "ClayPit", 
  "ReedBank", 
  "Fishing", 
  "Lessons", 
  "Copse", 
  "Grove", 
  "ResourceMarket4P", 
  "Hollow4P", 
  "Lessons4P", 
  "TravelingPlayers"
]

export default class CommonBoard extends React.Component {

  constructor(props) {
    super(props);
  }

  calculate_action_index(action, board){
    if(default_card_order.indexOf(action.action_id) !== -1){
      return default_card_order.indexOf(action.action_id);
    }
    if(board.round_cards.indexOf(action.action_id) !== -1){
      return board.round_cards.indexOf(action.action_id) + default_card_order.length
    }
    return -1
  }

  render() {
    if(!this.props.board){
        return <div/>;
    }

    this.props.board.actions.sort((a, b) => {
      const a_index = this.calculate_action_index(a, this.props.board);
      const b_index = this.calculate_action_index(b, this.props.board);
      if(a_index > b_index) return 1;
      if(a_index < b_index) return -1;
      return 0;
    })

    return (
    <div>
      <div>Major Improvements</div>
      <div style={{marginLeft: 16}}>{this.props.board.remaining_major_improvements.join(",")}</div>
      {
        this.props.board.actions.map((action) => {
          let style = round_card_style
          if(!action.is_available){
            style = Object.assign({background: player_colors[action.taken_by]}, style)
          }
          return <div style={style}>
            <div>
              {action.action_id}
            </div>
            {
              action.resources && action.resources.map((resource) => {
                return <Resource resource_type={resource.resource_type} resource_amount={resource.resource_amount} />
              })
            }
          </div>
        })
      }
    </div>
    );
  }
}
