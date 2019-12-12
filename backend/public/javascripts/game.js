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

console.log(window.gameData);

var Game = function (_React$Component) {
    _inherits(Game, _React$Component);

    function Game(props) {
        _classCallCheck(this, Game);

        //setup state
        var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

        _this.state = {
            money: 0,
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
                    money: window.gameData.money
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
                window.gameData.groups.push({
                    name: this.state.groupInput,
                    gid: window.gameData.maxGid
                });
                window.gameData.maxGid++;
                console.log(window.gameData.maxGid);
                var groups = [];
                for (var g = 0; g < window.gameData.groups.length; g++) {
                    groups.push(React.createElement(Group, { key: g, id: g, name: window.gameData.groups[g].name, "delete": this.delGroup.bind(this, g) }));
                }

                this.setState(Object.assign({}, this.state, {
                    groupInput: "",
                    groups: groups
                }));
            }
        }
    }, {
        key: "delGroup",
        value: function delGroup(id) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = data.employees[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var e = _step.value;

                    if (e.gid == window.gameData.groups[id].Gid) {
                        e.gid = -1;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            window.gameData.groups.splice(id, 1);
            var groups = [];
            for (var g = 0; g < window.gameData.groups.length; g++) {
                groups.push(React.createElement(Group, { key: g, id: g, name: window.gameData.groups[g].name, "delete": this.delGroup.bind(this, g) }));
            }
            this.setState(Object.assign({}, this.state, {
                groupInput: "",
                groups: groups
            }));
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

            if (window.gameData && window.gameData.ready) {
                var projects = window.gameData.projects.map(function (p, index) {
                    return React.createElement(Project, { key: index, id: index, name: p.name, desc: p.desc });
                });

                var employees = window.gameData.employees.map(function (e, index) {
                    return React.createElement(Employee, { key: index, id: index, name: e.name, int: e.int, cha: e.cha, str: e.str, desc: e.desc, eid: e.Eid });
                });
                var projectProposals = React.createElement("div", null);
                if (window.gameData.projectProposals) {
                    projectProposals = window.gameData.projectProposals.map(function (p, index) {
                        return React.createElement(Proposal, { key: index, id: index, name: p[0].name, desc: p[0].desc });
                    });
                }
                var applicants = React.createElement("div", null);
                if (window.gameData.applicants) {
                    applicants = window.gameData.applicants.map(function (p, index) {
                        return React.createElement(Applicant, { key: index, id: index, name: p.name, desc: p.desc });
                    });
                }

                return React.createElement(
                    "div",
                    { className: "game" },
                    React.createElement(
                        "h1",
                        { className: "money" },
                        "$",
                        window.gameData.money
                    ),
                    React.createElement(
                        "div",
                        { className: "content" },
                        React.createElement(
                            "div",
                            { className: "projects" },
                            React.createElement(
                                "h2",
                                { className: "col" },
                                "Projects"
                            ),
                            projects
                        ),
                        React.createElement(
                            "div",
                            { className: "employees" },
                            React.createElement(
                                "h2",
                                { className: "col" },
                                "Employees"
                            ),
                            employees
                        ),
                        React.createElement(
                            "div",
                            { className: "groups" },
                            React.createElement(
                                "h2",
                                { className: "col" },
                                "Groups"
                            ),
                            React.createElement("input", { className: "group-nameInput", type: "text", value: this.state.groupInput, onChange: this.onGroupInputUpdate }),
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
                            React.createElement(
                                "h2",
                                { className: "col" },
                                "Project Proposals"
                            ),
                            projectProposals
                        ),
                        React.createElement(
                            "div",
                            { className: "employee-pro" },
                            React.createElement(
                                "h2",
                                { className: "col" },
                                "Applying Employees"
                            ),
                            applicants
                        )
                    )
                );
            } else {
                return React.createElement("div", null);
            }
        }
    }]);

    return Game;
}(React.Component);

var domContainer = document.querySelector('.game-container');
ReactDOM.render(React.createElement(Game), domContainer);