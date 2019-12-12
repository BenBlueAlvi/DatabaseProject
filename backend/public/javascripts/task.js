'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Task = function (_React$Component) {
    _inherits(Task, _React$Component);

    function Task(props) {
        _classCallCheck(this, Task);

        //setup state
        var _this = _possibleConstructorReturn(this, (Task.__proto__ || Object.getPrototypeOf(Task)).call(this, props));

        _this.state = {
            progress: window.gameData.tasks[_this.props.id].proj_percent,
            selected: false
        };
        _this.select = _this.select.bind(_this);

        return _this;
    }

    _createClass(Task, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.update = setInterval(function () {
                _this2.setState(Object.assign({}, _this2.state, {
                    progress: window.gameData.tasks[_this2.props.id].proj_percent
                }));
            }, 1);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            clearInterval(this.update);
        }
    }, {
        key: "select",
        value: function select() {
            this.setState(Object.assign({}, this.state, {
                selected: !this.state.selected
            }));
        }
    }, {
        key: "render",
        value: function render() {
            var info = void 0;
            //set up dropdown stuff

            if (this.state.selected) {
                //todo clear assignies after assignment
                var assignees = [];
                var index = 0;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = window.gameData.employees[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var e = _step.value;


                        if (e.Tid == window.gameData.tasks[this.props.id].Tid) {
                            assignees.push(React.createElement(
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
                        "Assigned employees"
                    ),
                    assignees
                );
            } else {
                info = React.createElement("div", null);
            }

            var prog = 0;
            if (this.state.progress) {
                prog = this.state.progress;
            }

            return React.createElement(
                "div",
                { className: "task" },
                React.createElement(
                    "div",
                    { className: "task-name" },
                    this.props.name
                ),
                React.createElement(
                    "div",
                    { className: "task-progress" },
                    prog.toFixed(2),
                    "%"
                ),
                React.createElement(
                    "button",
                    { className: "project-dropdown-button", onClick: this.select },
                    "expand"
                ),
                React.createElement(
                    "div",
                    { className: "project-dropdown" },
                    info
                )
            );
        }
    }]);

    return Task;
}(React.Component);

export default Task;