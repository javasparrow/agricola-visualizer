import React from "react";
import ReactDOM from "react-dom";
import PlayerPanel from "./components/player_panel";
import CommonBoard from "./components/common_board";
import JSONPretty from 'react-json-pretty';

class Layout extends React.Component {

  constructor(props) {
    super(props);

    this.setLogIndex = this.setLogIndex.bind(this)
    this.handleChangeFolder = this.handleChangeFolder.bind(this)
    this.state = {}
  }

  componentWillMount() {
    document.addEventListener("keydown", this.onKeyPressed.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed.bind(this));
  }      

  onKeyPressed(e) {
    if(e.keyCode == 37 /* left */){
      this.setLogIndex(this.state.current_log_index - 1)
    }
    if(e.keyCode == 39 /* right */){
      this.setLogIndex(this.state.current_log_index + 1)
    }
  }

  handleChangeFile = (event) => {
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
    if(index <= 0){
      return;
    }
    if(this.state.json_data_array && index >= this.state.json_data_array.length - 1){
      return;
    }
    this.setState({current_log_index: index})
  }

  render() {

    let board_elements 

    if (this.state.json_data_array) {
      const json_data = this.state.json_data_array[this.state.current_log_index]
      console.log(json_data)
      board_elements = <div>
         <div>
          <button onClick={
            () => {
              this.setState({
                show_all_json: !this.state.show_all_json
              })
            }
          }>Toggle All JSON</button>
        </div>
        {this.state.show_all_json && <div>
          <JSONPretty data={json_data}></JSONPretty>
        </div>
        }
        <div style={{display: "flex"}}>
          <div style={{display: "inline-flex", flexGrow: 1}}>
            <div>
              <div>Stage:{json_data.current_stage}</div>
              <div>Round:{json_data.current_round}</div>
              <div>Current Player:{json_data.current_player}</div>
              <div>Start Player:{json_data.start_player}</div>
              <CommonBoard board={json_data.common_board} />
            </div>
          </div>
          <div style={{width: 500}}>
            {json_data.is_previous_action_failed && <div style={{color: "red", fontWeight: 700}}>Previous Action Failed!</div>}
            {json_data.is_previous_action_failed && <div style={{color: "red", fontWeight: 700}}>{json_data.previous_error}</div>}
            <div>Current Player: {json_data.current_player}</div>
            <div>Current Event: {json_data.current_event}</div>
            <div>Event Source: {json_data.event_source}</div>
            <div>
              <button onClick={
                () => {
                  this.setState({
                    show_cadidate_json: !this.state.show_cadidate_json
                  })
                }
              }>Toggle Candidate JSON</button>
            </div>
            <div>Player output</div>
            <JSONPretty data={json_data.player_output}></JSONPretty>
            {this.state.show_cadidate_json && json_data.choice_candidates && <div>
              <div>Chosen Candidate</div>
              {json_data.player_output.candidate_index ?
                <JSONPretty data={json_data.choice_candidates[json_data.player_output.candidate_index]}></JSONPretty>
                : <JSONPretty data={json_data.choice_candidates[json_data.choice_candidates.length - 1]}></JSONPretty>
              }
            </div>
            }
          </div>
        </div>
        <div style={{display: "flex"}}>
        {json_data.players.map(player => {
          return <div style={{width: `calc(${100 / json_data.players.length}vw`}}><PlayerPanel json_data={player}/></div>
        })}
      </div>
    </div>
    }

    return (
    <div style={{background: "#FFFFEF", minHeight: "calc(100vh)", padding: 8}}>
      <div>
        <input type="file" onChange={this.handleChangeFile} ></input>
        <button onClick={()=> this.setLogIndex(this.state.current_log_index - 1)}>back</button>
        {this.state.current_log_index}
        <button onClick={()=> this.setLogIndex(this.state.current_log_index + 1)}>next</button>
      </div>
      {board_elements}
    </div>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Layout/>, app);