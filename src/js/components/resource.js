import React from "react";
import ReactDOM from "react-dom";
import { GiWoodPile, GiBoarEnsign, GiCow, GiClayBrick, GiMeal, GiWheat, GiReed, GiSheep, GiCarrot, GiStonePile } from 'react-icons/gi';

const resource_type_map = {
  wood: <GiWoodPile />,
  boar: <GiBoarEnsign />,
  cattle: <GiCow />,
  clay: <GiClayBrick />,
  food: <GiMeal />,
  grain: <GiWheat />,
  reed: <GiReed />,
  sheep: <GiSheep />,
  stone: <GiStonePile />,
  veg: <GiCarrot />
}

const resource_color = {
  wood: "#8B4513",
  boar: "#000000",
  cattle: "#8B4513",
  clay: "#CD5C5C",
  food: "#CCCC00",
  grain: "#CCCC00",
  reed: "#666666",
  sheep: "#666666",
  stone: "#000000",
  veg: "#FF8C00"
}

export default class Resource extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div style={{display: "inline-block", margin: 10, color: resource_color[this.props.resource_type]}}> 
          {resource_type_map[this.props.resource_type]}:{this.props.resource_amount} 
        </div>
    );
  }
}
