import React from "react";
import ReactDOM from "react-dom";
import Resource from "./resource";
import { player_colors } from "../consts/colors";

const round_card_style = {
  width: 100,
  height: 60,
  border: "1px solid #CCCCCC",
  display: "inline-block",
  margin: 2,
  textPverflow: "ellipsis",
  overflow: "hidden",
  position: "relative"
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
      <div style={{flexDirection: "column", display: "flex", flexWrap: "wrap", height: 300, width: 0}}>
        {
          this.props.board.actions.map((action) => {
            let style = round_card_style
            style = Object.assign({background: `url("./img/${action.action_id}.jpg")`}, style)
            return <div style={style}>
              {
                action.resources && action.resources.map((resource) => {
                  return <div style={{background: "#FFFFFF90", display: "inline-block", position: "absolute", top: 0, bottom: 0, right:0, left:0, margin: "auto", width: 55, height: 35}}>
                    <Resource resource_type={resource.resource_type} resource_amount={resource.resource_amount} />
                  </div>
                })
              }
              {
                !action.is_available && <div style={{width: 36, height: 36, borderRadius: "50%", background: player_colors[action.taken_by], position: "absolute", top: 0, bottom: 0, right:0, left:0, margin: "auto"}} />
              }
            </div>
          })
        }
        {
          [...Array(30 - this.props.board.actions.length).keys()].map((index) => {
            let style = round_card_style
            style = Object.assign({background: "#222222"}, style) 
            return <div style={style}>
              <div style={{display: "inline-block", position: "absolute", top: 4, bottom: 0, right:0, left:4, margin: "auto", color: "#CCCCCC"}}>
                Round {index + this.props.board.actions.length - 15}
              </div>
            </div>
          })
        }
      </div>
    </div>
    );
  }
}
