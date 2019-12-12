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
        data.employees.push(
         data.applicants[this.props.id]


      )
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
