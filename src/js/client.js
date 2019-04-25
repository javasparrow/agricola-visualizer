import React from "react";
import ReactDOM from "react-dom";

class Layout extends React.Component {

  handleChangeFile = (event) => {
    console.log("heyhey");
    let fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      const content = fileReader.result
      console.log(content)
    }
    fileReader.readAsText(event.target.files[0]);
  }

  render() {
    return (
    <div>
      <h1>Welcome!</h1>
      <input type="file" onChange={this.handleChangeFile} ></input>
    </div>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Layout/>, app);