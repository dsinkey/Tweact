var React = require('react');
var ReactDOM = require('react-dom');
var Header = require('./Header.react');
var Tweet = require('./Tweet.react');

var StreamTweet = React.createClass({
	//define other component lifecycle methods here
	getInitialState: function(){
		console.log('[Snapterest] StremTweet 1. Running getInitialState()');

		return{
			numberOfCharactersIsIncreasing: null,
			headerText: null
		};
	},

	componentWillMount: function(){
		console.log('[Snaptrest] StreamTweet: 2. Running componentWillMount()');

		this.setState({
			numberOfCharactersIsIncreasing: true,
			headerText: 'Latest public photo from Twitter'
		});

		window.snapterest = {
			numberOfReceivedTweets: 1,
			numberOfDisplayedTweets: 1
		};
	},

	componentDidMount: function(){
		console.log('[Snaptrest] StreamTweet: 3. Running componentDidMount()');

		var componetDOMRepresentation = ReactDOM.findDOMNode(this);

		window.snapterest.headerHTML = componetDOMRepresentation.children[0].outerHTML;
		window.snapterest.tweetHTML = componetDOMRepresentation.children[1].outerHTML;
	},

	componetWillReceiveProps: function(nextProps){
		console.log('[Snaptrest] StreamTweet: 4. Running componentWillReiveProps()');

		var currentTweetLength = this.props.tweet.text.length;
		var nextTweetLength = nextProps.tweet.text.length;
		var isNumberOfCharactersIncreasing = (nextTweetLength > currentTweetLength);
		var headerText;

		this.setState({
			numberOfCharactersIsIncreasing: isNumberOfCharactersIncreasing
		});

		if(isNumberOfCharactersIncreasing){
			headerText = 'Number of characters is increasing';
		} else {
			headerText = 'Latest public photo from Twitter';
		}

		this.setState({
			headerText: headerText
		});

		window.snapterest.numberOfReceivedTweets++;
	},

	shouldComponentUpdate: function(nextProps, nextState){
		console.log('[Snaptrest] StreamTweet: 5. Running shouldComponentUpdate()');

		return (nextProps.tweet.text.length > 1);
	},

	componentWillUpdate: function(nextProps, nextState){
		console.log('[Snaptrest] StreamTweet: 6. Running componentWillUpdate()');
	},

	componentDidUpdate: function(nextProps, nextState){
		console.log('[Snaptrest] StreamTweet: 7. Running componentDidUpdate()');

		window.snapterest.numberOfDisplayedTweets++;
	},

	componentWillUnmount: function(){
		console.log('[Snaptrest] StreamTweet: 8. Running componentWillUnmount()');

		delete window.snapterest;
	},

	render: function(){
		console.log('[Snapterest] StreamTweet: Running Render()');

		return(
			<section>
				<Header text={this.state.headerText}/>
				<Tweet tweet={this.props.headerText} onImageClick={this.props.onAddTweetToCollection}/>
			</section>
		);
	}
});

module.exports = StreamTweet;