'use strict';

import data from "./data.js"

class Group extends React.Component {
  constructor(props) {
    super(props);
    //setup state
   this.state = {
       selected: false,
       show: true
   }
   this.select = this.select.bind(this);
  
 
  }

 

  select(){
      this.setState({
        ...this.state,
        selected: !this.state.selected
      })
      
  }

  
  
  render() {
    if (this.state.show){
        let info;
        //set up dropdown stuff
        if (this.state.selected){
            //todo clear assignies after assignment
            let members = [];
            let index = 0;
            for (let e of data.employees){
                for (let g of data.groups){
                    console.log(e.gid, g.gid)
                    
                    if (e.gid == g.gid){
                        members.push(
                            <div>
                                <div>{index}: {e.name}</div>
                            </div>
                        );
                        index++;
                    }
                }
            }
            
    
            info = <div>
            <div>Member employees</div>
                {members}
            </div>;
        } else{
            info = <div></div>
        }
    
        return (
            <div className="group">
                <div>{this.props.name}</div>
                <button onClick={this.select}>Expand</button>
                <button onClick={this.props.delete}>Delete</button>
                <button onClick={this.props.delete}>Assign Manager</button>
                {info}
            </div>
        );
    }
    else{
        return(<div></div>)
    }
   
  }
}
export default Group;
