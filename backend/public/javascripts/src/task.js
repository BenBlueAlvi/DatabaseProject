'use strict';



class Task extends React.Component {
  constructor(props) {
    super(props);
    //setup state
   this.state = {
       progress: window.gameData.tasks[this.props.id].proj_percent,
       selected: false
   }
   this.select = this.select.bind(this);
 
  }

  componentDidMount() {
    this.update = setInterval(()=>{
        this.setState({
            ...this.state,
            progress: window.gameData.tasks[this.props.id].proj_percent
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
        for (let e of window.gameData.employees){
            
            if (e.Tid == window.gameData.tasks[this.props.id].Tid){
                assignees.push(
                    <div>
                        <div>{index}: {e.name}</div>
                    </div>
                )
                index++;
            }
            
        }

        

        info = <div>
        <div>Assigned employees</div>
            {assignees}
        </div>;
    } else{
        info = <div></div>
    }

    let prog = 0
    if (this.state.progress){
        prog = this.state.progress
    }

    return (
        <div className="task">
             <div className="task-name">{this.props.name}</div>
             <div className="task-progress">{prog.toFixed(2)}%</div>
             <button className="project-dropdown-button" onClick={this.select}>expand</button>
             <div className="project-dropdown">
                {info}
            </div>
        </div>
    );
  }
}
export default Task;
