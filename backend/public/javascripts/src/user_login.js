'use strict';



class UserLogin extends React.Component {
  constructor(props) {
    super(props);
    //setup state
    this.state = {
      username: '',
      password: ''
    };
    
    //bind all the functions
    this.onUsernameUpdate = this.onUsernameUpdate.bind(this);
    this.onPasswordUpdate = this.onPasswordUpdate.bind(this);

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.help = this.help.bind(this);
 
  }

  login(event){
   
    fetch("/auth", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        
      },
      redirect: 'follow',
      body: JSON.stringify(this.state)
    }).then((res)=>res.text())
    .then((t) => {
        if (t === "allow"){
          window.location.href = "/game.html"
         

        
        }  else {
          alert(t);
        }
       
      
    })
    
    
   
  }

  register(event){
    fetch("/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',

      },
      redirect: 'follow',
      body: JSON.stringify(this.state)
    }).then(function (res) {
      return res.text();
    }).then(function (t) {
      if (t === "allow") {
        window.location.href = "/game.html";
      } else {
        alert(t);
      }
    });
  }

  help(){
    window.location.href = "https://github.com/BenBlueAlvi/DatabaseProject/wiki";
  }

  onUsernameUpdate(event){
   
    this.setState({
      ...this.state,
      username: event.target.value
    })
    
  }

  onPasswordUpdate(event){
    this.setState({
      ...this.state,
      password: event.target.value
    })
  }

  render() {
 

    return (
      <div className="login">
        <h1 className="title">YAMS</h1>
        <div className="inputArea">
          <p>Username:</p>
          <input type="text" value={this.state.username} onChange={this.onUsernameUpdate}></input>
        </div>
        <div className="inputArea">
          <p>Password:</p>
          <input type="password" value={this.state.password} onChange={this.onPasswordUpdate}></input>
        </div>
      
        <button className="submitButton" onClick={this.login}>
          login
        </button>
        <button className="submitButton" onClick={this.register}>
          register
        </button>
        <button className = "submitButton" onClick={this.help}>
            Help
          </button>

       
      </div>
    );
  }
}

let domContainer = document.querySelector('.like_button_container');
ReactDOM.render(<UserLogin />, domContainer);