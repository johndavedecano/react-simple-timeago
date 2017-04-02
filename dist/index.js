'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _difference_in_seconds = require('date-fns/difference_in_seconds');

var _difference_in_seconds2 = _interopRequireDefault(_difference_in_seconds);

var _distance_in_words_to_now = require('date-fns/distance_in_words_to_now');

var _distance_in_words_to_now2 = _interopRequireDefault(_distance_in_words_to_now);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimeAgo = function (_Component) {
    _inherits(TimeAgo, _Component);

    function TimeAgo() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, TimeAgo);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TimeAgo.__proto__ || Object.getPrototypeOf(TimeAgo)).call.apply(_ref, [this].concat(args))), _this), _this.isMounted = false, _this.state = {
            lastUpdatedAt: null
        }, _this.updateTime = function () {
            var interval = _this.getInterval();
            if (interval > 0) {
                setTimeout(_this.updateTime, interval);
                if (_this.isMounted) {
                    _this.setState({
                        lastUpdatedAt: new Date().getTime()
                    });
                }
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(TimeAgo, [{
        key: 'componentDidMount',
        value: function componentDidMount() {

            this.isMounted = true;

            if (this.props.isLive) {
                this.updateTime();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.isMounted = false;
        }
    }, {
        key: 'getDifference',
        value: function getDifference() {
            return (0, _difference_in_seconds2.default)(new Date(), this.props.date);
        }
    }, {
        key: 'getInterval',
        value: function getInterval() {
            var diff = this.getDifference();
            if (diff < 3600) {
                return 60000;
            } else if (diff >= 3600 && diff <= 86400) {
                return 3600000;
            } else {
                return 0;
            }
        }
    }, {
        key: 'getParsedDate',
        value: function getParsedDate() {
            var diff = this.getDifference();
            if (diff < 30) {
                return 'now';
            } else {
                var options = {
                    addSuffix: this.props.addSuffix,
                    includeSeconds: this.props.includeSeconds
                };
                return (0, _distance_in_words_to_now2.default)(this.props.date, options);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(this.props.element, { className: this.props.className ? this.props.className : '' }, this.getParsedDate());
        }
    }]);

    return TimeAgo;
}(_react.Component);

TimeAgo.defaultProps = {
    element: 'p',
    date: new Date(),
    className: undefined,
    isLive: true,
    addSuffix: true,
    includeSeconds: true
};

var allowedDateTypes = [_react2.default.PropTypes.string, _react2.default.PropTypes.number, _react2.default.PropTypes.instanceOf(Date)];

TimeAgo.propTypes = {
    element: _react2.default.PropTypes.string,
    date: _react2.default.PropTypes.oneOfType(allowedDateTypes),
    className: _react2.default.PropTypes.string,
    isLive: _react2.default.PropTypes.bool,
    addSuffix: _react2.default.PropTypes.bool,
    includeSeconds: _react2.default.PropTypes.bool
};

exports.default = TimeAgo;