'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var data = window.gameData;

var Applicant = function (_React$Component) {
  _inherits(Applicant, _React$Component);

  function Applicant(props) {
    _classCallCheck(this, Applicant);

    //setup state
    var _this = _possibleConstructorReturn(this, (Applicant.__proto__ || Object.getPrototypeOf(Applicant)).call(this, props));

    _this.hire = _this.hire.bind(_this);

    return _this;
  }

  _createClass(Applicant, [{
    key: "hire",
    value: function hire() {

      window.gameData.maxEid += 1;
      window.gameData.employees.push(window.gameData.applicants[this.props.id]);

      fetch("/newEmployee", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',

        },
        redirect: 'follow',
        body: JSON.stringify(window.gameData.applicants[this.props.id])
      }).then(function (res) {
        return res.text();
      }).then(function (t) {
        if (t) {
          alert(t);
        }
      });

      window.gameData.applicants.splice(this.props.id, 1);
    }
  }, {
    key: "render",
    value: function render() {

      return React.createElement(
        "div",
        { className: "applicant" },
        React.createElement(
          "div",
          { className: "applicant-name" },
          this.props.name
        ),
        React.createElement(
          "div",
          { className: "applicant-desc" },
          this.props.desc
        ),
        React.createElement(
          "button",
          { onClick: this.hire, className: "applicant-accept" },
          "Hire"
        )
      );
    }
  }]);

  return Applicant;
}(React.Component);

export default Applicant;