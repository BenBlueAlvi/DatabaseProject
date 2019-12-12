'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
            group: data.groups[0],
            task: data.tasks[0],
            showGroups: false,
            showTasks: false,
            wage: data.employees[_this.props.id].wage,
            morale: data.employees[_this.props.id].morale

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

            data.employees[this.props.id].tid = t.tid;
        }
    }, {
        key: "assignGroup",
        value: function assignGroup(g) {
            this.setState(Object.assign({}, this.state, {
                group: g
            }));
            data.employees[this.props.id].gid = g.gid;
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
        key: "render",
        value: function render() {
            var _this2 = this;

            var tasks = [];
            var groups = void 0;

            if (this.state.showGroups) {
                groups = data.groups.map(function (g, index) {
                    return React.createElement(
                        "div",
                        { className: "dropdown", key: index, onClick: _this2.assignGroup.bind(_this2, g) },
                        g.name
                    );
                });
            }

            var idx = 0;
            if (this.state.showTasks) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = data.tasks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var t = _step.value;
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = data.projects[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var p = _step2.value;

                                if (t.pid == p.pid) {
                                    tasks.push(React.createElement(
                                        "div",
                                        { className: "dropdown", key: idx, onClick: this.assignTask.bind(this, t) },
                                        p.name,
                                        ": ",
                                        t.name
                                    ));
                                    idx++;
                                }
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
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
                        data.employees[this.props.id].morale
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
                    groups,
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