import React from "react";
import ReactDOM from "react-dom";
import Resource from "./resource";

const round_card_style = {
  width: 80,
  height: 120,
  border: "1px solid black",
  display: "inline-block",
  margin: 10,
  textPverflow: "ellipsis",
  overflow: "hidden"
}

const round_card_style_disable = {
  width: 80,
  height: 120,
  border: "1px solid black",
  display: "inline-block",
  margin: 10,
  background: "#666666",
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
            round_card_style_disable
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
