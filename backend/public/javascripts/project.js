'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import data from "./data.js";
import Task from "./task.js";

var Project = function (_React$Component) {
    _inherits(Project, _React$Component);

    function Project(props) {
        _classCallCheck(this, Project);

        //setup state
        var _this = _possibleConstructorReturn(this, (Project.__proto__ || Object.getPrototypeOf(Project)).call(this, props));

        _this.state = {
            tasks: data.projects[_this.props.id].tasks,
            progress: 0,
            selected: false
        };
        _this.select = _this.select.bind(_this);

        return _this;
    }

    _createClass(Project, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            this.update = setInterval(function () {
                _this2.setState(Object.assign({}, _this2.state, {
                    progress: data.projects[_this2.props.id].progress
                }));
            }, 1000);
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
            var _this3 = this;

            var tasks = this.state.tasks.map(function (t, index) {
                return React.createElement(Task, { key: index, id: index, pid: _this3.props.id, name: t.name });
            });

            var info = void 0;
            if (this.state.selected) {
                info = React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        { className: "project-client" },
                        "Client: ",
                        this.props.client
                    ),
                    tasks
                );
            } else {
                info = React.createElement("div", null);
            }

            return React.createElement(
                "div",
                { className: "project" },
                React.createElement(
                    "div",
                    { className: "project-name" },
                    this.props.name
                ),
                React.createElement(
                    "div",
                    { className: "project-progress" },
                    this.state.progress
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

    return Project;
}(React.Component);

export default Project;