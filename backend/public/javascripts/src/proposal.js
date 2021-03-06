'use strict';

import Task from "./task.js";
class Project extends React.Component {
  constructor(props) {
    super(props);
    //setup state
   this.state = {
       selected: false
   }
   this.select = this.select.bind(this);
   this.accept = this.accept.bind(this);
  } 


  

  select(){
      this.setState({
        ...this.state,
        selected: !this.state.selected
      })
      
  }

  accept(){
     
    window.gameData.projects.push(window.gameData.projectProposals[this.props.id][0]);
      for (let t of window.gameData.projectProposals[this.props.id][1]){
        
        window.gameData.tasks.push(t);
      }
      
      window.gameData.projectProposals.splice(this.props.id, 1)
  }
  
  
  render() {
    let tasks = window.gameData.projectProposals[this.props.id][1].map((t, index) => (
        <Task key={index} id={index} pid={this.props.id} name={t.name}/>));

    let info;
    if (this.state.selected){
        info = <div>
        <div className="project-client">Client: {this.props.client}</div>
        {tasks}
        </div>;
    } else{
        info = <div></div>
    }

    return (
        <div className="project">
            <div className="project-name">{this.props.name}</div>
                <div className="project-progress">{this.state.progress}</div>
                <button className="project-dropdown-button" onClick={this.select}>expand</button>
                <div className="project-dropdown">
                {info}
            </div>
            <button className="proposal-accept" onClick={this.accept}>
                Accept
            </button>
        </div>
    );
  }
}


export default Project;
