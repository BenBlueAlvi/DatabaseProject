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
            selected: false
        };
        _this.select = _this.select.bind(_this);
        _this.accept = _this.accept.bind(_this);
        return _this;
    }

    _createClass(Project, [{
        key: "select",
        value: function select() {
            this.setState(Object.assign({}, this.state, {
                selected: !this.state.selected
            }));
        }
    }, {
        key: "accept",
        value: function accept() {

            data.projects.push(data.projectProposals[this.props.id][0]);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = data.projectProposals[this.props.id][1][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var t = _step.value;


                    data.tasks.push(t);
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

            data.projectProposals.splice(this.props.id, 1);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var tasks = data.projectProposals[this.props.id][1].map(function (t, index) {
                return React.createElement(Task, { key: index, id: index, pid: _this2.props.id, name: t.name });
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
                ),
                React.createElement(
                    "button",
                    { className: "proposal-accept", onClick: this.accept },
                    "Accept"
                )
            );
        }
    }]);

    return Project;
}(React.Component);

export default Project;