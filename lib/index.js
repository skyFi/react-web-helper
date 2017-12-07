'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxConnectDecorator = require('./lib/reduxConnectDecorator');

var _reduxConnectDecorator2 = _interopRequireDefault(_reduxConnectDecorator);

var _withRouterDecorator = require('./lib/withRouterDecorator');

var _withRouterDecorator2 = _interopRequireDefault(_withRouterDecorator);

var _fetchDataDecoretor = require('./lib/fetchDataDecoretor');

var _fetchDataDecoretor2 = _interopRequireDefault(_fetchDataDecoretor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  reduxConnect: _reduxConnectDecorator2.default,
  withRouter: _withRouterDecorator2.default,
  fetchData: _fetchDataDecoretor2.default
};
