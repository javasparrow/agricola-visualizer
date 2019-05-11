import React from "react";
import ReactDOM from "react-dom";

const sqare_size = 30
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
  width: sqare_size,
  height: sqare_size,
  display: "inline-flex",
  position: "absolute"
}

export default class PlayerBoard extends React.Component {

  constructor(props) {
    super(props);
  }

  get_sqare_element(sqare, x, y) {

    const position_style = {
      top: y * (sqare_size + margin_size) + margin_size,
      left: x * (sqare_size + margin_size) + margin_size
    }

    switch(sqare.object_type){
      case "wooden_hut":
        return <div style={Object.assign({},commonn_style, wooden_hut_style, position_style)} />
      case "field":
        return <div style={Object.assign({},commonn_style,field_style, position_style)} />
      default:
        return <div style={Object.assign({},commonn_style, position_style)} />
    }
  }

  render() {

    let board_elements = [] 
    if(this.props.board){
      // draw sqare
      for(let y = 0; y < 3; y ++){
        for(let x = 0; x < 5; x ++){
          board_elements.push(this.get_sqare_element(this.props.board[y][x], x, y))
        }
      }
    }

    let fence_elements = []
    if(this.props.fences){
      for(const fence of this.props.fences){
        const left = Math.min(fence[0][0], fence[1][0]) * (sqare_size + margin_size) 
        const top = Math.min(fence[0][1], fence[1][1]) * (sqare_size + margin_size)
        const width = fence[0][0] == fence[1][0] ? margin_size : sqare_size + margin_size * 2
        const height = fence[0][1] == fence[1][1] ? margin_size : sqare_size + margin_size * 2

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
    <div style={{position: "relative", height: (sqare_size + margin_size) * 3}}>
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
