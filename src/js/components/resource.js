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

export default class Resource extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div style={{display: "inline-block", margin: 10}}> 
          {resource_type_map[this.props.resource_type]}:{this.props.resource_amount} 
        </div>
    );
  }
}
