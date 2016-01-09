var React = require('react');
//var SnapkiteStreamClient = require('snapkite-stream-client');
var StreamTweet = require('./StreamTweet.react');
var Header = require('./Header.react');
var TweetStore require('../stores.TweetStore');

var Stream = React.createClass({

	getInitialState: function(){
		return {
			tweet: TweetStore.getTweet()
		}
	},

	componetDidMount: function(){
		TweetStore.addChangeListener(this.onTweetChange);
	},

	componetWillUnmount: function(){
		TweetStore.removeChangeListener(this.onTweetChange);
	},

	onTweetChange: function(){
		this.setState({
			tweet: TweetStore.getTweet()
		});
	},

	// componetDidMount: function(){
	// 	SnapkiteStreamClient.initializeStream(this.handleNewTweet);
	// },

	// componetWillUnmount: function(){
	// 	SnapkiteStreamClient.destroyStream();
	// },

	// handleNewTweet: function(tweet){
	// 	this.setState({
	// 		tweet: tweet
	// 	});
	// },

	render: function(){
		var tweet = this.state.tweet;

		if(tweet){
			return(
				<StreamTweet tweet={tweet} onAddTweetToCollection={this.props.onAddTweetToCollection}/>
			);
		}
		return (
			<Header text="Waiting for public photos from Twitter..."/>
		);
	}
});

module.exports = Stream;