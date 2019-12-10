'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import Project from "./project.js";
import data from "./data.js";
import Employee from "./employee.js";
import Group from "./group.js";
import Proposal from "./proposal.js";
import Applicant from "./applicant.js";

var Game = function (_React$Component) {
    _inherits(Game, _React$Component);

    function Game(props) {
        _classCallCheck(this, Game);

        //setup state
        var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

        _this.state = {
            money: data.money,
            groupInput: ""
        };

        _this.onGroupInputUpdate = _this.onGroupInputUpdate.bind(_this);
        _this.addGroup = _this.addGroup.bind(_this);

        return _this;
    }

    _createClass(Game, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.update = setInterval(function () {
                _this2.setState(Object.assign({}, _this2.state, {
                    money: data.money
                }));
            }, 1000);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            clearInterval(this.update);
        }
    }, {
        key: "addGroup",
        value: function addGroup() {
            if (this.state.groupInput != "") {
                data.groups.push({
                    name: this.state.groupInput,
                    members: []
                });
                this.setState(Object.assign({}, this.state, {
                    groupInput: "",
                    groups: data.groups.map(function (e, index) {
                        return React.createElement(Group, { key: index, id: index, name: e.name });
                    })
                }));
            }
        }
    }, {
        key: "onGroupInputUpdate",
        value: function onGroupInputUpdate(event) {
            this.setState(Object.assign({}, this.state, {
                groupInput: event.target.value
            }));
        }
    }, {
        key: "render",
        value: function render() {
            var projects = data.projects.map(function (p, index) {
                return React.createElement(Project, { key: index, id: index, name: p.name, desc: p.desc });
            });

            var employees = data.employees.map(function (e, index) {
                return React.createElement(Employee, { key: index, id: index, name: e.name, int: e.int, cha: e.cha, str: e.str, desc: e.desc, eid: e.eid });
            });

            var projectProposals = data.projectProposals.map(function (p, index) {
                return React.createElement(Proposal, { key: index, id: index, name: p.name, desc: p.desc });
            });

            var applicants = data.applicants.map(function (p, index) {
                return React.createElement(Applicant, { key: index, id: index, name: p.name, desc: p.desc });
            });

            return React.createElement(
                "div",
                { className: "game" },
                "$",
                this.state.money,
                React.createElement(
                    "div",
                    { className: "content" },
                    React.createElement(
                        "div",
                        { className: "projects" },
                        "Projects",
                        projects
                    ),
                    React.createElement(
                        "div",
                        { className: "employees" },
                        "Employees",
                        employees
                    ),
                    React.createElement(
                        "div",
                        { className: "groups" },
                        "Groups",
                        React.createElement("input", { type: "text", value: this.state.groupInput, onChange: this.onGroupInputUpdate }),
                        React.createElement(
                            "button",
                            { onClick: this.addGroup },
                            "+"
                        ),
                        this.state.groups
                    )
                ),
                React.createElement(
                    "div",
                    { className: "proposals" },
                    React.createElement(
                        "div",
                        { className: "project-pro" },
                        "Project Proposals",
                        projectProposals
                    ),
                    React.createElement(
                        "div",
                        { className: "employee-pro" },
                        "Applying Employees",
                        applicants
                    )
                )
            );
        }
    }]);

    return Game;
}(React.Component);

var domContainer = document.querySelector('.game-container');
ReactDOM.render(React.createElement(Game, null), domContainer);