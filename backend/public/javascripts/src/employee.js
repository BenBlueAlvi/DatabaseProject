'use strict';

import data from "./data.js";

class Employee extends React.Component {
  constructor(props) {
    super(props);
    //setup state
    this.state = {
        group: "",
        task: data.noTask,
        showGroups: false,
        showTasks: false,
        wage: data.employees[this.props.id].wage,
        morale: 0
        
    }
    this.groupDropdown = this.groupDropdown.bind(this);
    this.taskDropdown = this.taskDropdown.bind(this);
    this.incWage = this.incWage.bind(this);
    this.decWage = this.decWage.bind(this);
 
  }

  groupDropdown(){
    this.setState({
        ...this.state,
        showGroups: !this.state.showGroups,
        showTasks: false
    })
  }

  taskDropdown(){
    this.setState({
        ...this.state,
        showTasks: !this.state.showTasks,
        showGroups: false
    })
  }

  assignTask(t){
      this.setState({
          ...this.state,
          task: t
      })
      //clear assignees after assignment
      for (let p=0; p < data.projects.length; p++){
          for (let v=0; v < data.projects[p].tasks.length; v++){
              for (let e=0; e < data.projects[p].tasks[v].assignees.length; e++){
                  if(data.projects[p].tasks[v].assignees[e].eid == this.props.eid){
                        data.projects[p].tasks[v].assignees.splice(e,1)
                  }
              }
          }
      }

      
      t.assignees = [
          ...t.assignees,
          {
            name: this.props.name,
            desc: this.props.desc,
            wage: this.state.wage,
            str: this.props.str,
            int: this.props.int,
            cha: this.props.cha,
            eid: this.props.eid
            
          }
      ]
  }

  assignGroup(g){
    this.setState({
        ...this.state,
        group: g
    })
    //clear assignees after assignment
    for (let p=0; p < data.groups.length; p++){
        for (let v=0; v < data.groups[p].members.length; v++){
           if (data.groups[p].members[v].eid == this.props.eid){
                data.groups[p].members.splice(v,1)
           }
        }
    }

    
    g.members = [
        ...g.members,
        {
          name: this.props.name,
          desc: this.props.desc,
          wage: this.state.wage,
          str: this.props.str,
          int: this.props.int,
          cha: this.props.cha,
          eid: this.props.eid
          
        }
    ]
  }

  incWage(){
    
    data.employees[this.props.id].wage += 1;

    this.setState({
        ...this.state,
        wage: data.employees[this.props.id].wage
    })
  }

  decWage(){
    if (this.state.wage > 0){
        data.employees[this.props.id].wage -= 1;
        this.setState({
            ...this.state,
            wage: data.employees[this.props.id].wage
        })
    }
    
  }

  componentDidMount() {
    this.update = setInterval(()=>{
        this.setState({
            ...this.state,
           morale:  data.employees[this.props.id].morale
        })
        
    }
        ,1
    );
  }

  componentWillUnmount() {
    clearInterval(this.update);
  }
 
  
  render() {
    let tasks;
    let groups;

    if (this.state.showGroups){
        groups = data.groups.map((g, index) => (
            
            <div className="dropdown" key={index} onClick={this.assignGroup.bind(this, g)}>
                {g.name}
            </div>
                
        ));
    }


    if (this.state.showTasks){
        tasks = data.projects.map((p, index) => (
              p.tasks.map((t, idx)=>(
                  <div className="dropdown" key={index+idx} onClick={this.assignTask.bind(this, t)}>
                      {p.name}: {t.name}
                  </div>
              ))  
        ));
    }

    let morale = ""
    if(data.employees[this.props.id].morale < 0 && data.employees[this.props.id].morale >= -100){
        morale = "low";
    } else if(data.employees[this.props.id].morale < -100 && data.employees[this.props.id].morale >= -200){
        morale = "dismal";
    } else if(data.employees[this.props.id].morale < -200 && data.employees[this.props.id].morale >= -300){
        morale = "miserable";
    } else if(data.employees[this.props.id].morale >= 0 && data.employees[this.props.id].morale < 100){
        morale = "high";
    } else if(data.employees[this.props.id].morale >= 100 && data.employees[this.props.id].morale < 200){
        morale = "great";
    } else if(data.employees[this.props.id].morale >= 200 && data.employees[this.props.id].morale < 300){
        morale = "elated";
    }  else if(data.employees[this.props.id].morale >= 300){
        morale = "extreme";
    }


    return (
        <div className="employee">
            <div className="employee-name">{this.props.name}</div>
            <div className="employee-d">
                <div className="employee-desc">{this.props.desc}</div>
                <div className="employee-morale">Morale: {morale}</div>
                <div className="employee-wage">
                    <button onClick={this.incWage}>&uarr;</button>
                    <p className="employee-wage-value">${this.state.wage}</p>
                    <button onClick={this.decWage}>&darr;</button>
                </div>
            </div>
            
            <div className="employee-assignments">
                <div className="employee-assign">
                    Assigned Group: {this.state.group.name}
                    <button onClick={this.groupDropdown}>Assign</button>
                    
                </div>
                <div className="employee-assign">
                    Assigned Task: {this.state.task.name}
                    <button onClick={this.taskDropdown}>Assign</button>
                    
                </div>
                {groups}
                {tasks}
            </div>
        </div>
    );
  }
}
export default Employee;

/*let domContainer = document.querySelector('.employee');
ReactDOM.render(<Employee />, domContainer);*/