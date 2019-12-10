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
            employees: data.groups[_this.props.id].members,
            selected: false
        };
        _this.select = _this.select.bind(_this);

        return _this;
    }

    _createClass(Group, [{
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
                var members = data.groups[this.props.id].members.map(function (e, index) {
                    return React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "div",
                            null,
                            index,
                            ": ",
                            e.name
                        )
                    );
                });

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

            return React.createElement(
                "div",
                { className: "group" },
                React.createElement(
                    "div",
                    null,
                    this.props.name
                ),
                React.createElement(
                    "button",
                    { onClick: this.select },
                    "Expand"
                ),
                info
            );
        }
    }]);

    return Group;
}(React.Component);

export default Group;