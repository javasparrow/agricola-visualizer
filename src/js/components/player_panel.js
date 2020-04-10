import React from "react";
import ReactDOM from "react-dom";
import ResourcePanel from "./resource_panel";
import PlayerBoard from "./player_board";
import { player_colors } from "../consts/colors";
import { strict } from "assert";
import JSONPretty from 'react-json-pretty';

const improvement_style = {
  width: 80,
  height: 100,
  background: "rgb(250,150,50)",
  margin: 10,
  display: "inline-block"
}

const improvement_title_style = {
  width: 70,
  margin: 5,
  height: 40,
  fontWeight: "bold",
  background: "rgb(250,230,150)",
  wordWrap: "break-word",
  lineHeight: "1em"
}

const occupation_style = {
  width: 80,
  height: 100,
  background: "rgb(250,215,100)",
  margin: 10,
  display: "inline-block"
}

const occupation_title_style = {
  width: 70,
  margin: 5,
  height: 40,
  fontWeight: "bold",
  background: "rgb(250,230,150)",
  wordWrap: "break-word",
  lineHeight: "1em"
}

export default class PlayerPanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {

    if(!this.props.json_data){
      return <div/>
    }

    return (
    <div style={{padding: 8, border: "solid 1px #CCCCCC"}}>
      <div style={{color: player_colors[this.props.json_data.player_id], fontSize: 36}}>
        Player{this.props.json_data.player_id}
      {
        this.props.json_data.families.map((family) => {
          if(family.family_type == "in_house"){
            return "●"
          } else {
            return ""
          }
        })
      }</div>
      {this.state.showJSON && <div>
        <JSONPretty data={this.props.json_data}></JSONPretty>
      </div>
      }
      <div>Score:{this.props.json_data.score}</div>
      <div>Begging:{this.props.json_data.begging_cards}</div>
      <div>Hand Improvements</div>
      <div style={{marginLeft: 16, "overflow-wrap": "break-word"}}>{Object.keys(this.props.json_data.hand_improvements).join(",")}</div>
      <div>Hand Occupations</div>
      <div style={{marginLeft: 16, "overflow-wrap": "break-word"}}>{Object.keys(this.props.json_data.hand_occupations).join(",")}</div>
      <ResourcePanel resources={this.props.json_data.resources} />
      <PlayerBoard board={this.props.json_data.board} fences={this.props.json_data.fences} />
      <div>
        {
          Object.keys(this.props.json_data.played_occupations).map(occupation_id => <div style={occupation_style}>
            <div style={occupation_title_style}>{occupation_id}</div>
          </div>)
        }
        {
          Object.keys(this.props.json_data.played_improvements).map(improvement_id => <div style={improvement_style}>
            <div style={improvement_title_style}>{improvement_id}</div>
          </div>)
        }
      </div>
      <table style={{"table-layout": "fixed", "width": "100%"}}>
        <tr>
          {Array.from(Array(14).keys()).map((round) => <th style={{"border": "1px solid #DDDDDD", "padding": 4}}>{round + 1}</th>)}
        </tr>
        <tr>
          {
            Array.from(Array(14).keys()).map((round) => {
              if (this.props.json_data.round_resources[`${round + 1}`]){
                return <th style={{"border": "1px solid #DDDDDD", "padding": 4, "overflow": "hidden"}}>{
                  JSON.stringify(this.props.json_data.round_resources[`${round + 1}`])
                }</th>
              }
              return <th style={{"border": "1px solid #DDDDDD", "padding": 4}}></th>
            })
          }
        </tr>
      </table>
      <div>
        <button onClick={
          () => {
            this.setState({
              showJSON: !this.state.showJSON
            })
          }
        }>Toggle JSON</button>
      </div>
    </div>
    );
  }
}
