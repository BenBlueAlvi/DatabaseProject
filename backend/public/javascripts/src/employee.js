'use strict';



class Employee extends React.Component {
  constructor(props) {
    super(props);
    //setup state
    this.state = {
        group: null,
        task: null,
        showGroups: false,
        showTasks: false,
        wage: window.gameData.employees[this.props.id].wage,
        morale: window.gameData.employees[this.props.id].morale
        
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
     

      
      window.gameData.employees[this.props.id].Tid = t.Tid
  }

  assignGroup(g){
    this.setState({
        ...this.state,
        group: g
    })
    window.gameData.employees[this.props.id].Gid = g.Gid
  }

  incWage(){
    
    window.gameData.employees[this.props.id].wage += 1;

    this.setState({
        ...this.state,
        wage: window.gameData.employees[this.props.id].wage
    })
  }

  decWage(){
    if (this.state.wage > 0){
        window.gameData.employees[this.props.id].wage -= 1;
        this.setState({
            ...this.state,
            wage: window.gameData.employees[this.props.id].wage
        })
    }
    
  }

 
 
 
  
  render() {
    let tasks = [];
    let groups;

    if (this.state.showGroups){
        groups = window.gameData.groups.map((g, index) => (
            
            <div className="dropdown" key={index} onClick={this.assignGroup.bind(this, g)}>
                {g.name}
            </div>
                
        ));
    }

    let idx = 0
    if (this.state.showTasks){
       for (let t of window.gameData.tasks){
           for (let p of window.gameData.projects){
               if (t.Pid == p.Pid){
                    tasks.push(
                    <div className="dropdown" key={idx} onClick={this.assignTask.bind(this, t)}>
                        {p.name}: {t.name}
                    </div>
                   )
                   idx++;
               }
           }
       }
      
    }

    let morale = ""
    if(window.gameData.employees[this.props.id].morale < 0 && window.gameData.employees[this.props.id].morale >= -100){
        morale = "low";
    } else if(window.gameData.employees[this.props.id].morale < -100 && window.gameData.employees[this.props.id].morale >= -200){
        morale = "dismal";
    } else if(window.gameData.employees[this.props.id].morale < -200 && window.gameData.employees[this.props.id].morale >= -300){
        morale = "miserable";
    } else if(window.gameData.employees[this.props.id].morale >= 0 && window.gameData.employees[this.props.id].morale < 100){
        morale = "high";
    } else if(window.gameData.employees[this.props.id].morale >= 100 && window.gameData.employees[this.props.id].morale < 200){
        morale = "great";
    } else if(window.gameData.employees[this.props.id].morale >= 200 && window.gameData.employees[this.props.id].morale < 300){
        morale = "elated";
    }  else if(window.gameData.employees[this.props.id].morale >= 300){
        morale = "extreme";
    }

    let ggroup = "None"
    if (this.state.group){
        ggroup = this.state.group.name
    }

    let ttask = "None"
    if (this.state.task){
        ttask = this.state.task.name
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
                    Assigned Group: {ggroup}
                    <button onClick={this.groupDropdown}>Assign</button>
                    
                </div>
                {groups}
                <div className="employee-assign">
                    Assigned Task: {ttask}
                    <button onClick={this.taskDropdown}>Assign</button>
                    
                </div>
              
                {tasks}
            </div>
        </div>
    );
  }
}
export default Employee;

/*let domContainer = document.querySelector('.employee');
ReactDOM.render(<Employee />, domContainer);*/