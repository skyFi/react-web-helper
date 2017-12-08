'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isFirstLoadOnServer = true;
var fetchData = function fetchData() {
  var notPreventFirstFetchOnBroswer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  return function (WrappedComponent) {
    var Enhance = function (_React$Component) {
      (0, _inherits3.default)(Enhance, _React$Component);

      function Enhance() {
        (0, _classCallCheck3.default)(this, Enhance);
        return (0, _possibleConstructorReturn3.default)(this, (Enhance.__proto__ || (0, _getPrototypeOf2.default)(Enhance)).apply(this, arguments));
      }

      (0, _createClass3.default)(Enhance, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          if (isFirstLoadOnServer || notPreventFirstFetchOnBroswer) {
            isFirstLoadOnServer = false;
            if (WrappedComponent.fetchData instanceof Function) {
              WrappedComponent.fetchData({
                dispatch: this.props.dispatch,
                match: this.props.match
              });
            }
          }
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, this.props);
        }
      }]);
      return Enhance;
    }(_react2.default.Component);

    return (0, _reactRedux.connect)()((0, _hoistNonReactStatics2.default)(Enhance, WrappedComponent));
  };
};

exports.default = fetchData;