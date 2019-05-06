import React from "react";
import ReactDOM from "react-dom";
import PlayerPanel from "./components/player_panel";
import CommonBoard from "./components/common_board";

class Layout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  handleChangeFile = (event) => {
    console.log("heyhey");
    let fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      const content = fileReader.result
      console.log(content)
      const json_log = JSON.parse(content);
      console.log(json_log);
      this.setState({json_data: json_log})
    }
    fileReader.readAsText(event.target.files[0]);
  }

  render() {

    let board_elements 

    if (this.state.json_data) {
      board_elements = <div>
        <CommonBoard board={this.state.json_data.common_board} />
        {this.state.json_data.players.map(player => {
          return <PlayerPanel json_data={player}/>
        })}
      </div>
    }

    return (
    <div>
      <h1>Welcome!</h1>
      <input type="file" onChange={this.handleChangeFile} ></input>
      { board_elements }
    </div>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Layout/>, app);