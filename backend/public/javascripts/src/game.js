'use strict';
import Project from "./project.js";
import data from "./data.js";
import Employee from "./employee.js";
import Group from "./group.js";
import Proposal from "./proposal.js";
import Applicant from "./applicant.js"


console.log(window.gameData)

class Game extends React.Component {
  constructor(props) {
      
    super(props);
    //setup state
   this.state = {
       money: 0,
       groupInput: ""
   }

   this.onGroupInputUpdate = this.onGroupInputUpdate.bind(this);
   this.addGroup = this.addGroup.bind(this);
 
 
  }

  componentDidMount() {
   
    this.update = setInterval(()=>{
    
        this.setState({
            ...this.state,
            money: window.gameData.money
        })
        
        
        
        
    }
        ,1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.update);
  }


  addGroup(){

      if (this.state.groupInput != ""){
        window.gameData.groups.push({
            name: this.state.groupInput,
            gid: window.gameData.maxGid
          })
          window.gameData.maxGid++;
          console.log(window.gameData.maxGid)
          let groups = [];
          for (let g = 0; g < window.gameData.groups.length; g++){
            groups.push(<Group key={g} id={g} name={window.gameData.groups[g].name} delete={this.delGroup.bind(this, g)}/>)
          }


          this.setState({
            ...this.state,
            groupInput: "",
            groups: groups
          })
      }
     
  }

  delGroup(id){
    for (let e of data.employees){
        if (e.gid == window.gameData.groups[id].Gid){
            e.gid = -1;
        }
    }
    window.gameData.groups.splice(id, 1)
    let groups = [];
    for (let g = 0; g < window.gameData.groups.length; g++){
        groups.push(<Group key={g} id={g} name={window.gameData.groups[g].name} delete={this.delGroup.bind(this, g)}/>)
    }
      this.setState({
        ...this.state,
        groupInput: "",
        groups: groups
      })

    

   
  }

  onGroupInputUpdate(event){
    this.setState({
        ...this.state,
        groupInput: event.target.value
      })
  }
  
  render() {
    
    if (window.gameData && window.gameData.ready){
        let projects = window.gameData.projects.map((p, index) => (
            <Project key={index} id={index} name={p.name} desc = {p.desc}/>));
    
        let employees = window.gameData.employees.map((e, index)=>(
            <Employee key={index} id={index} name={e.name} int={e.int} cha={e.cha} str={e.str} desc={e.desc} eid={e.Eid}/>
        ));
        let projectProposals = <div/>
        if (window.gameData.projectProposals){
           projectProposals = window.gameData.projectProposals.map((p, index)=>(
                <Proposal key={index} id={index} name={p[0].name} desc = {p[0].desc}/>
            ));
        }
        let applicants = <div/>
        if (window.gameData.applicants){
             applicants = window.gameData.applicants.map((p, index)=>(
                <Applicant key={index} id={index} name={p.name} desc = {p.desc}/>
            ));
        }
        
        
        return (
            <div className="game">
                <h1 className="money">${window.gameData.money}</h1>
                <div className="content">
                    <div className="projects"><h2 className="col">Projects</h2>{projects}</div>
                    <div className="employees"><h2 className="col">Employees</h2>{employees}</div>
                    <div className="groups">
                        <h2 className="col">Groups</h2>
                        <input className="group-nameInput" type="text" value={this.state.groupInput} onChange={this.onGroupInputUpdate}></input>
                        <button onClick={this.addGroup}>+</button>
                        {this.state.groups}
                    </div>
                </div>
                <div className="proposals"> 
                    <div className="project-pro">
                        <h2 className="col">Project Proposals</h2>
                        {projectProposals}
                    </div>
                    <div className="employee-pro">
                        <h2 className="col">Applying Employees</h2>
                        {applicants}
                    </div>
                </div>
            </div>
        );
    } else {
        return (<div/>)
    }
    
  }
}


let domContainer = document.querySelector('.game-container');
ReactDOM.render(React.createElement(Game), domContainer);