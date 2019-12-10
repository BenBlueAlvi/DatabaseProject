'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import data from "./data.js";

var Employee = function (_React$Component) {
    _inherits(Employee, _React$Component);

    function Employee(props) {
        _classCallCheck(this, Employee);

        //setup state
        var _this = _possibleConstructorReturn(this, (Employee.__proto__ || Object.getPrototypeOf(Employee)).call(this, props));

        _this.state = {
            group: "",
            task: data.noTask,
            showGroups: false,
            showTasks: false,
            wage: data.employees[_this.props.id].wage,
            morale: 0

        };
        _this.groupDropdown = _this.groupDropdown.bind(_this);
        _this.taskDropdown = _this.taskDropdown.bind(_this);
        _this.incWage = _this.incWage.bind(_this);
        _this.decWage = _this.decWage.bind(_this);

        return _this;
    }

    _createClass(Employee, [{
        key: "groupDropdown",
        value: function groupDropdown() {
            this.setState(Object.assign({}, this.state, {
                showGroups: !this.state.showGroups,
                showTasks: false
            }));
        }
    }, {
        key: "taskDropdown",
        value: function taskDropdown() {
            this.setState(Object.assign({}, this.state, {
                showTasks: !this.state.showTasks,
                showGroups: false
            }));
        }
    }, {
        key: "assignTask",
        value: function assignTask(t) {
            this.setState(Object.assign({}, this.state, {
                task: t
            }));
            //clear assignees after assignment
            for (var p = 0; p < data.projects.length; p++) {
                for (var v = 0; v < data.projects[p].tasks.length; v++) {
                    for (var e = 0; e < data.projects[p].tasks[v].assignees.length; e++) {
                        if (data.projects[p].tasks[v].assignees[e].eid == this.props.eid) {
                            data.projects[p].tasks[v].assignees.splice(e, 1);
                        }
                    }
                }
            }

            t.assignees = [].concat(_toConsumableArray(t.assignees), [{
                name: this.props.name,
                desc: this.props.desc,
                wage: this.state.wage,
                str: this.props.str,
                int: this.props.int,
                cha: this.props.cha,
                eid: this.props.eid

            }]);
        }
    }, {
        key: "assignGroup",
        value: function assignGroup(g) {
            this.setState(Object.assign({}, this.state, {
                group: g
            }));
            //clear assignees after assignment
            for (var p = 0; p < data.groups.length; p++) {
                for (var v = 0; v < data.groups[p].members.length; v++) {
                    if (data.groups[p].members[v].eid == this.props.eid) {
                        data.groups[p].members.splice(v, 1);
                    }
                }
            }

            g.members = [].concat(_toConsumableArray(g.members), [{
                name: this.props.name,
                desc: this.props.desc,
                wage: this.state.wage,
                str: this.props.str,
                int: this.props.int,
                cha: this.props.cha,
                eid: this.props.eid

            }]);
        }
    }, {
        key: "incWage",
        value: function incWage() {

            data.employees[this.props.id].wage += 1;

            this.setState(Object.assign({}, this.state, {
                wage: data.employees[this.props.id].wage
            }));
        }
    }, {
        key: "decWage",
        value: function decWage() {
            if (this.state.wage > 0) {
                data.employees[this.props.id].wage -= 1;
                this.setState(Object.assign({}, this.state, {
                    wage: data.employees[this.props.id].wage
                }));
            }
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.update = setInterval(function () {
                _this2.setState(Object.assign({}, _this2.state, {
                    morale: data.employees[_this2.props.id].morale
                }));
            }, 1);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            clearInterval(this.update);
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var tasks = void 0;
            var groups = void 0;

            if (this.state.showGroups) {
                groups = data.groups.map(function (g, index) {
                    return React.createElement(
                        "div",
                        { className: "dropdown", key: index, onClick: _this3.assignGroup.bind(_this3, g) },
                        g.name
                    );
                });
            }

            if (this.state.showTasks) {
                tasks = data.projects.map(function (p, index) {
                    return p.tasks.map(function (t, idx) {
                        return React.createElement(
                            "div",
                            { className: "dropdown", key: index + idx, onClick: _this3.assignTask.bind(_this3, t) },
                            p.name,
                            ": ",
                            t.name
                        );
                    });
                });
            }

            var morale = "";
            if (data.employees[this.props.id].morale < 0 && data.employees[this.props.id].morale >= -100) {
                morale = "low";
            } else if (data.employees[this.props.id].morale < -100 && data.employees[this.props.id].morale >= -200) {
                morale = "dismal";
            } else if (data.employees[this.props.id].morale < -200 && data.employees[this.props.id].morale >= -300) {
                morale = "miserable";
            } else if (data.employees[this.props.id].morale >= 0 && data.employees[this.props.id].morale < 100) {
                morale = "high";
            } else if (data.employees[this.props.id].morale >= 100 && data.employees[this.props.id].morale < 200) {
                morale = "great";
            } else if (data.employees[this.props.id].morale >= 200 && data.employees[this.props.id].morale < 300) {
                morale = "elated";
            } else if (data.employees[this.props.id].morale >= 300) {
                morale = "extreme";
            }

            return React.createElement(
                "div",
                { className: "employee" },
                React.createElement(
                    "div",
                    { className: "employee-name" },
                    this.props.name
                ),
                React.createElement(
                    "div",
                    { className: "employee-d" },
                    React.createElement(
                        "div",
                        { className: "employee-desc" },
                        this.props.desc
                    ),
                    React.createElement(
                        "div",
                        { className: "employee-morale" },
                        "Morale: ",
                        morale
                    ),
                    React.createElement(
                        "div",
                        { className: "employee-wage" },
                        React.createElement(
                            "button",
                            { onClick: this.incWage },
                            "\u2191"
                        ),
                        React.createElement(
                            "p",
                            { className: "employee-wage-value" },
                            "$",
                            this.state.wage
                        ),
                        React.createElement(
                            "button",
                            { onClick: this.decWage },
                            "\u2193"
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "employee-assignments" },
                    React.createElement(
                        "div",
                        { className: "employee-assign" },
                        "Assigned Group: ",
                        this.state.group.name,
                        React.createElement(
                            "button",
                            { onClick: this.groupDropdown },
                            "Assign"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "employee-assign" },
                        "Assigned Task: ",
                        this.state.task.name,
                        React.createElement(
                            "button",
                            { onClick: this.taskDropdown },
                            "Assign"
                        )
                    ),
                    groups,
                    tasks
                )
            );
        }
    }]);

    return Employee;
}(React.Component);

export default Employee;

/*let domContainer = document.querySelector('.employee');
ReactDOM.render(<Employee />, domContainer);*/