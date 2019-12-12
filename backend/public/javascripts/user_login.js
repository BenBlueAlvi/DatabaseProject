'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UserLogin = function (_React$Component) {
  _inherits(UserLogin, _React$Component);

  function UserLogin(props) {
    _classCallCheck(this, UserLogin);

    //setup state
    var _this = _possibleConstructorReturn(this, (UserLogin.__proto__ || Object.getPrototypeOf(UserLogin)).call(this, props));

    _this.state = {
      username: '',
      password: ''
    };
    //bind all the functions
    _this.onUsernameUpdate = _this.onUsernameUpdate.bind(_this);
    _this.onPasswordUpdate = _this.onPasswordUpdate.bind(_this);

    _this.login = _this.login.bind(_this);
    _this.register = _this.register.bind(_this);

    return _this;
  }

  _createClass(UserLogin, [{
    key: 'login',
    value: function login(event) {
      console.log(JSON.stringify(this.state));
      // window.location.href = "/game.html";
      fetch("/auth", {
        method: "POST",
        body: JSON.stringify(this.state)
      }).then(function (res) {
        //if bad username/password
        alert(res);
      });
    }
  }, {
    key: 'register',
    value: function register(event) {}
  }, {
    key: 'onUsernameUpdate',
    value: function onUsernameUpdate(event) {

      this.setState(Object.assign({}, this.state, {
        username: event.target.value
      }));
    }
  }, {
    key: 'onPasswordUpdate',
    value: function onPasswordUpdate(event) {
      this.setState(Object.assign({}, this.state, {
        password: event.target.value
      }));
    }
  }, {
    key: 'render',
    value: function render() {

      return React.createElement(
        'div',
        { className: 'login' },
        React.createElement(
          'h1',
          { className: 'title' },
          'Hello!'
        ),
        React.createElement(
          'div',
          { className: 'inputArea' },
          React.createElement(
            'p',
            null,
            'Username:'
          ),
          React.createElement('input', { type: 'text', value: this.state.username, onChange: this.onUsernameUpdate })
        ),
        React.createElement(
          'div',
          { className: 'inputArea' },
          React.createElement(
            'p',
            null,
            'Password:'
          ),
          React.createElement('input', { type: 'text', value: this.state.password, onChange: this.onPasswordUpdate })
        ),
        React.createElement(
          'button',
          { className: 'submitButton', onClick: this.login },
          'login'
        ),
        React.createElement(
          'button',
          { className: 'submitButton', onClick: this.register },
          'register'
        )
      );
    }
  }]);

  return UserLogin;
}(React.Component);

var domContainer = document.querySelector('.like_button_container');
ReactDOM.render(React.createElement(UserLogin, null), domContainer);