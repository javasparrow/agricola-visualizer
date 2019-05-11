import React from "react";
import ReactDOM from "react-dom";
import PlayerPanel from "./components/player_panel";
import CommonBoard from "./components/common_board";

class Layout extends React.Component {

  constructor(props) {
    super(props);

    this.setLogIndex = this.setLogIndex.bind(this)
    this.handleChangeFolder = this.handleChangeFolder.bind(this)
    this.state = {}
  }

  handleChangeFile = (event) => {
    console.log("heyhey");
    this.readStateFile(event.target.files[0])
    this.setLogIndex(1)
  }

  handleChangeFolder = (event) => {
    console.log(event)
    console.log(event.target.files)

    this.log_files = Array.from(event.target.files)
    this.setLogIndex(1)
  }

  readStateFile = (file) => {
    let fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      const content = fileReader.result
      console.log(content)
      const json_data_array = content.split("\n").map((json) => {
        console.log(json)
        if (!json){
          return {}
        }
        return JSON.parse(json)
      });
      this.setState({json_data_array: json_data_array})
    }
    fileReader.readAsText(file);
  }

  setLogIndex = (index) => {
    this.setState({current_log_index: index})
  }

  render() {

    let board_elements 

    if (this.state.json_data_array) {
      const json_data = this.state.json_data_array[this.state.current_log_index]
      board_elements = <div>
        <div>Stage:{json_data.current_stage}</div>
        <div>Round:{json_data.current_round}</div>
        <div>Current Player:{json_data.current_player}</div>
        <div>Start Player:{json_data.start_player}</div>
        <CommonBoard board={json_data.common_board} />
        {json_data.players.map(player => {
          return <PlayerPanel json_data={player}/>
        })}
      </div>
    }

    return (
    <div>
      <h1>Welcome!</h1>
      <input type="file" onChange={this.handleChangeFile} ></input>
      <button onClick={()=> this.setLogIndex(this.state.current_log_index - 1)}>back</button>
      {this.state.current_log_index}
      <button onClick={()=> this.setLogIndex(this.state.current_log_index + 1)}>next</button>
      { board_elements }
    </div>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Layout/>, app);