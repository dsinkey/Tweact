var React = require('react');
var ReactDOM = require('react-dom');
var Application = require('./components/Application.react');
var WebApiUtils = require('./utils/WebApiUtils');

WebApiUtils.initializeStreamOfTweets();

ReactDOM.render(<Application />, document.getElementById('react-application'));


















