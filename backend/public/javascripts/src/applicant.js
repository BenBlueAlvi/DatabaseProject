'use strict';
var data = window.gameData

class Applicant extends React.Component {
  constructor(props) {
    super(props);
    //setup state
    this.hire = this.hire.bind(this);
  
  } 

  hire(){
        
    window.gameData.maxEid += 1;
        window.gameData.employees.push(
          window.gameData.applicants[this.props.id]


      )
      window.gameData.applicants.splice(this.props.id, 1)
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
