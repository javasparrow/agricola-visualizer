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
      const json_log = JSON.parse(content);
      console.log(json_log);
      this.setState({json_data: json_log})
    }
    fileReader.readAsText(file);
  }

  setLogIndex = (index) => {
    this.setState({current_log_index: index})
    this.readStateFile(this.log_files.filter((file) => file.name == `state${index}.json`)[0])
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
      <input type="file" onChange={this.handleChangeFolder} webkitdirectory="true" directory="true"/>
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