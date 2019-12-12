'use strict';
import data from "./data.js";
import Task from "./task.js";
class Project extends React.Component {
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
            progress: data.projects[this.props.id].progress
        })
        
    }
        ,1000
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
    
       
    let tasks = [];

   
    for (let t =1; t < data.tasks.length; t++){
        if (data.projects[this.props.id].pid == data.tasks[t].pid){
            tasks.push(
                <Task key={t} id={t} name={data.tasks[t].name}/>
            );
         
        }
    }
    

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
            <div className="project-info">
                <div className="project-name">{this.props.name}</div>
                <div className="project-progress">{this.state.progress.toFixed(2)}%</div>
             </div>
             <button className="project-dropdown-button" onClick={this.select}>expand</button>
             <div className="project-dropdown">
                {info}
            </div>
        </div>
    );
  }
}


export default Project;
