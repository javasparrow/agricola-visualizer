import React from "react";
import ReactDOM from "react-dom";

const wooden_hut_style = {
  width: 30,
  height: 30,
  border: "1px solid black",
  backgroundImage: "url(http://www.boiteajeux.net/jeux/agr/img/maisonbois.gif)",
  backgroundSize: "contain"
}

const sqare_style = {
  width: 30,
  height: 30,
  border: "1px solid black"
}

export default class PlayerBoard extends React.Component {

  constructor(props) {
    super(props);
  }

  get_sqare_element(sqare) {
    switch(sqare.object_type){
      case "wooden_hut":
        return <div style={wooden_hut_style} />
      default:
        return <div style={sqare_style} />
    }
  }

  render() {

    let board_elements 
    if(this.props.board){
      board_elements = this.props.board.map((row) => {
        return <div>
          {row.map((sqare) => {
            return <div style={{display: "inline-block", margin: 5}}> 
              {this.get_sqare_element(sqare)}
            </div>
          })}
        </div>
      })
    }

    return (
    <div>
      {
        board_elements
      }
    </div>
    );
  }
}
