'use strict';
import Project from "./project.js";
import data from "./data.js";
import Employee from "./employee.js";
import Group from "./group.js";
import Proposal from "./proposal.js";
import Applicant from "./applicant.js"
class Game extends React.Component {
  constructor(props) {
    super(props);
    //setup state
   this.state = {
       money: data.money,
       groupInput: ""
   }

   this.onGroupInputUpdate = this.onGroupInputUpdate.bind(this);
   this.addGroup = this.addGroup.bind(this);
 
 
  }

  componentDidMount() {
    this.update = setInterval(()=>{
        this.setState({
            ...this.state,
            money: data.money
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
         data.groups.push({
            name: this.state.groupInput,
            gid: data.maxGid
          })
          data.maxGid++;
          console.log(data.maxGid)
          let groups = [];
          for (let g = 1; g < data.groups.length; g++){
            groups.push(<Group key={g} id={g} name={data.groups[g].name} delete={this.delGroup.bind(this, g)}/>)
          }


          this.setState({
            ...this.state,
            groupInput: "",
            groups: groups
          })
      }
     
  }

  delGroup(id){
    data.groups.splice(id, 1)
    let groups = [];
    for (let g = 1; g < data.groups.length; g++){
        groups.push(<Group key={g} id={g} name={data.groups[g].name} delete={this.delGroup.bind(this, g)}/>)
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
    let projects = data.projects.map((p, index) => (
        <Project key={index} id={index} name={p.name} desc = {p.desc}/>));

    let employees = data.employees.map((e, index)=>(
        <Employee key={index} id={index} name={e.name} int={e.int} cha={e.cha} str={e.str} desc={e.desc} eid={e.eid}/>
    ));

    let projectProposals = data.projectProposals.map((p, index)=>(
        <Proposal key={index} id={index} name={p.name} desc = {p.desc}/>
    ));

    let applicants = data.applicants.map((p, index)=>(
        <Applicant key={index} id={index} name={p.name} desc = {p.desc}/>
    ));

    return (
        <div className="game">
            ${this.state.money}
            <div className="content">
                <div className="projects">Projects{projects}</div>
                <div className="employees">Employees{employees}</div>
                <div className="groups">
                    Groups
                    <input type="text" value={this.state.groupInput} onChange={this.onGroupInputUpdate}></input>
                    <button onClick={this.addGroup}>+</button>
                    {this.state.groups}
                </div>
            </div>
            <div className="proposals"> 
                <div className="project-pro">
                    Project Proposals
                    {projectProposals}
                </div>
                <div className="employee-pro">
                    Applying Employees
                    {applicants}
                </div>
            </div>
        </div>
    );
  }
}


let domContainer = document.querySelector('.game-container');
ReactDOM.render(<Game />, domContainer);