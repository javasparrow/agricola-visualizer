import React from "react";
import ReactDOM from "react-dom";
import { GiSquare } from "react-icons/gi";

const square_size = 50
const margin_size = 10

const wooden_hut_style = {
  border: "1px solid black",
  backgroundImage: "url(http://www.boiteajeux.net/jeux/agr/img/maisonbois.gif)",
  backgroundSize: "contain"
}

const field_style = {
  border: "1px solid black",
  backgroundImage: "url(http://www.boiteajeux.net/jeux/agr/img/champ.gif)",
  backgroundSize: "contain"
}

const commonn_style = {
  border: "1px solid black",
  width: square_size,
  height: square_size,
  display: "inline-flex",
  position: "absolute"
}

export default class PlayerBoard extends React.Component {

  constructor(props) {
    super(props);
  }

  get_square_element(square, x, y) {

    const position_style = {
      top: y * (square_size + margin_size) + margin_size,
      left: x * (square_size + margin_size) + margin_size
    }

    switch(square.object_type){
      case "wooden_hut":
        return <div style={Object.assign({},commonn_style, wooden_hut_style, position_style)} />
      case "field":
        let planted_elements;
        if (square.item_count > 0) {
          switch(square.kind){
            case "grain":
              planted_elements = <div style={{fontSize: 24, background:"#FFFF00"}}>{square.item_count}</div>
              break
            case "veg":
              planted_elements = <div style={{fontSize: 24, background:"#FFA500"}}>{square.item_count}</div>
              break
          }
        }
        return <div style={Object.assign({},commonn_style,field_style, position_style)}> {planted_elements} </div>
      default:
        return <div style={Object.assign({},commonn_style, position_style)} />
    }
  }

  render() {

    let board_elements = [] 
    if(this.props.board){
      // draw square
      for(let y = 0; y < 3; y ++){
        for(let x = 0; x < 5; x ++){
          board_elements.push(this.get_square_element(this.props.board[y][x], x, y))
        }
      }
    }

    let fence_elements = []
    if(this.props.fences){
      for(const fence of this.props.fences){
        const left = Math.min(fence[0][0], fence[1][0]) * (square_size + margin_size) 
        const top = Math.min(fence[0][1], fence[1][1]) * (square_size + margin_size)
        const width = fence[0][0] == fence[1][0] ? margin_size : square_size + margin_size * 2
        const height = fence[0][1] == fence[1][1] ? margin_size : square_size + margin_size * 2

        const fence_style = {
          display:"inline-flex",
          position: "absolute",
          top,
          left,
          width,
          height,
          background: "black"
        }
        fence_elements.push(<div style={fence_style}></div>)
      }
    }

    return (
    <div style={{position: "relative", height: (square_size + margin_size) * 3}}>
      {
        fence_elements
      }
      {
        board_elements
      }
    </div>
    );
  }
}
