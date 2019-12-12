'use strict';

var data = window.gameData

class Group extends React.Component {
  constructor(props) {
    super(props);
    //setup state
   this.state = {
       selected: false,
       assign: false,
       show: true,
       managerName: "none"
   }
   this.select = this.select.bind(this);
   this.assign = this.assign.bind(this);
  
 
  }

 

  select(){
      this.setState({
        ...this.state,
        selected: !this.state.selected,
        assign: false
      })
      
  }

  assign(){
      this.setState(
          {
            ...this.state,
            selected: false,
            assign: !this.state.assign
          }
      )
  }

  assignManager(e){
    window.gameData.groups[this.props.id].eid = e.eid
      this.setState(
        {
          ...this.state,
         managerName: e.name
        }
    ) 
  }

  
  
  render() {
    if (this.state.show){
        let info;
        //set up dropdown stuff
        if (this.state.selected){
            //todo clear assignies after assignment
            let members = [];
            let index = 0;
            for (let e of window.gameData.employees){
               
                    
                if (e.gid == window.gameData.groups[this.props.id].gid){
                    members.push(
                        <div>
                            <div>{index}: {e.name}</div>
                        </div>
                    );
                    index++;
                }
                
            }
            
    
            info = <div>
            <div>Member employees</div>
                {members}
            </div>;
        } else{
            info = <div></div>
        }
        let manager;
        if (this.state.assign){
            let emps = []
            for (let e of data.employees){
                emps.push(<div className="dropdown" onClick={this.assignManager.bind(this, e)}>{e.name}</div>)
            }
            manager = <div>{emps}</div>
        } else {
            manager = <div></div>
        }

       

        return (
            <div className="group">
                <div>{this.props.name}</div>
                <div>Manager: {this.state.managerName}</div>
                <button onClick={this.select}>Expand</button>
                <button onClick={this.props.delete}>Delete</button>
                <button onClick={this.assign}>Assign Manager</button>
                {info}
                {manager}
            </div>
        );
    }
    else{
        return(<div></div>)
    }
   
  }
}
export default Group;
