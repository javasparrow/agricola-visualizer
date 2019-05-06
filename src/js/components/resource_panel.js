import React from "react";
import ReactDOM from "react-dom";
import Resource from "./resource";

export default class ResourcePanel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let resourse_elements
    if (this.props.resources){
      resourse_elements = Object.entries(this.props.resources).map(([key, value]) => {
        return <Resource resource_type={key} resource_amount={value} />
      })
    }

    return (
    <div>

      {resourse_elements}
    </div>
    );
  }
}
