'use strict';

import data from "./data.js";

class Employee extends React.Component {
  constructor(props) {
    super(props);
    //setup state
    this.state = {
        group: data.groups[0],
        task: data.tasks[0],
        showGroups: false,
        showTasks: false,
        wage: data.employees[this.props.id].wage,
        morale: data.employees[this.props.id].morale
        
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
     

      
     data.employees[this.props.id].tid = t.tid
  }

  assignGroup(g){
    this.setState({
        ...this.state,
        group: g
    })
    data.employees[this.props.id].gid = g.gid
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
       
        data.tasks.map((t, idx)=>(
            <div className="dropdown" key={idx} onClick={this.assignTask.bind(this, t)}>
                {t.pid}: {t.name}
            </div>
        ))  
    
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