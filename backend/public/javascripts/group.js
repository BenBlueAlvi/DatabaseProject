'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import data from "./data.js";

var Group = function (_React$Component) {
    _inherits(Group, _React$Component);

    function Group(props) {
        _classCallCheck(this, Group);

        //setup state
        var _this = _possibleConstructorReturn(this, (Group.__proto__ || Object.getPrototypeOf(Group)).call(this, props));

        _this.state = {
            selected: false,
            assign: false,
            show: true,
            managerName: "none"
        };
        _this.select = _this.select.bind(_this);
        _this.assign = _this.assign.bind(_this);

        return _this;
    }

    _createClass(Group, [{
        key: "select",
        value: function select() {
            this.setState(Object.assign({}, this.state, {
                selected: !this.state.selected,
                assign: false
            }));
        }
    }, {
        key: "assign",
        value: function assign() {
            this.setState(Object.assign({}, this.state, {
                selected: false,
                assign: !this.state.assign
            }));
        }
    }, {
        key: "assignManager",
        value: function assignManager(e) {
            data.groups[this.props.id].eid = e.eid;
            this.setState(Object.assign({}, this.state, {
                managerName: e.name
            }));
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.show) {
                var info = void 0;
                //set up dropdown stuff
                if (this.state.selected) {
                    //todo clear assignies after assignment
                    var members = [];
                    var index = 0;
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = data.employees[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var e = _step.value;


                            if (e.gid == data.groups[this.props.id].gid) {
                                members.push(React.createElement(
                                    "div",
                                    null,
                                    React.createElement(
                                        "div",
                                        null,
                                        index,
                                        ": ",
                                        e.name
                                    )
                                ));
                                index++;
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

                    info = React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "div",
                            null,
                            "Member employees"
                        ),
                        members
                    );
                } else {
                    info = React.createElement("div", null);
                }
                var manager = void 0;
                if (this.state.assign) {
                    var emps = [];
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = data.employees[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var _e = _step2.value;

                            emps.push(React.createElement(
                                "div",
                                { className: "dropdown", onClick: this.assignManager.bind(this, _e) },
                                _e.name
                            ));
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

                    manager = React.createElement(
                        "div",
                        null,
                        emps
                    );
                } else {
                    manager = React.createElement("div", null);
                }

                return React.createElement(
                    "div",
                    { className: "group" },
                    React.createElement(
                        "div",
                        null,
                        this.props.name
                    ),
                    React.createElement(
                        "div",
                        null,
                        "Manager: ",
                        this.state.managerName
                    ),
                    React.createElement(
                        "button",
                        { onClick: this.select },
                        "Expand"
                    ),
                    React.createElement(
                        "button",
                        { onClick: this.props.delete },
                        "Delete"
                    ),
                    React.createElement(
                        "button",
                        { onClick: this.assign },
                        "Assign Manager"
                    ),
                    info,
                    manager
                );
            } else {
                return React.createElement("div", null);
            }
        }
    }]);

    return Group;
}(React.Component);

export default Group;