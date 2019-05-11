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

export default class CommonBoard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if(!this.props.board){
        return <div/>
    }

    return (
    <div>
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
