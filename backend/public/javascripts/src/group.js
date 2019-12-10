'use strict';

import data from "./data.js"

class Group extends React.Component {
  constructor(props) {
    super(props);
    //setup state
   this.state = {
       employees: data.groups[this.props.id].members,
       selected: false
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
    let info;
    //set up dropdown stuff
    if (this.state.selected){
        //todo clear assignies after assignment
        let members = data.groups[this.props.id].members.map((e, index) => (
            <div>
                <div>{index}: {e.name}</div>
            </div>
            
            ));

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
            {info}
        </div>
    );
  }
}
export default Group;
