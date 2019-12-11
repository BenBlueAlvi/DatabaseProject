'use strict';

import data from "./data.js"

class Task extends React.Component {
  constructor(props) {
    super(props);
    //setup state
   this.state = {
       progress: 0,
       selected: false
   }
   this.select = this.select.bind(this);
 
  }

  componentDidMount() {
    this.update = setInterval(()=>{
        this.setState({
            ...this.state,
            progress: data.tasks[this.props.id].progress
        })
        
    }
        ,1
    );
  }

  componentWillUnmount() {
    clearInterval(this.update);
  }

  select(){
      this.setState({
        ...this.state,
        selected: !this.state.selected
      })
      
  }
  
  render() {
    let info;
    //set up dropdown stuff
    if (this.state.selected){
        //todo clear assignies after assignment
        let assignees = [];
        let index = 0;
        for (let e of data.employees){
            for (let t of data.tasks){
                if (e.tid == t.tid){
                    assignees.push(
                        <div>
                            <div>{index}: {e.name}</div>
                        </div>
                    )
                    index++;
                }
            }
        }

        

        info = <div>
        <div>Assigned employees</div>
            {assignees}
        </div>;
    } else{
        info = <div></div>
    }

    return (
        <div className="task">
             <div className="task-name">{this.props.name}</div>
             <div className="task-progress">{this.state.progress}</div>
             <button className="project-dropdown-button" onClick={this.select}>expand</button>
             <div className="project-dropdown">
                {info}
            </div>
        </div>
    );
  }
}
export default Task;
