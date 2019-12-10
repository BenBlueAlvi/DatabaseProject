'use strict';
import data from "./data.js"

class Applicant extends React.Component {
  constructor(props) {
    super(props);
    //setup state
    this.hire = this.hire.bind(this);
  
  } 

  hire(){
        data.maxEid += 1;
        data.employees.push({
            name: this.props.name,
            desc: this.props.desc,
            int: this.props.int,
            str: this.props.str,
            cha: this.props.cha,
            wage: 0,
            morale: 0,
            eid: data.maxEid


      })
      data.applicants.splice(this.props.id, 1)
  }


  
  
  render() {
   

    return (
        <div className="applicant">
            <div className="applicant-name">{this.props.name}</div>
            <div className="applicant-desc">{this.props.desc}</div> 
            <button onClick={this.hire} className="applicant-accept">
                Hire
            </button>
        </div>
    );
  }
}


export default Applicant;
