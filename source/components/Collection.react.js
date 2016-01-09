var React = require('react');
var ReactDOMServer = require('react-dom/server');
var CollectionControls = require('./CollectionControls.react');
var TweetList = require('./TweetList.react');
var Header = require('./Header.react');

var Collection = React.createClass({
	createHtmlStringOfTweetList: function(){
		var htmlString = ReactDOMServer.renderToStaticMarkup(
			<TweetList tweets={this.props.tweets}/>
		);

		var htmlMarkup = {
			html: htmlString
		};

		return JSON.stringify(htmlMarkup);
	},

	getListOfTweetIds: function(){
		return Object.keys(this.props.tweets);
	},

	getNumberOfTweetsInCollection: function(){
		return this.getListOfTweetIds().length;
	},

	render: function(){
		var NumberOfTweetsInCollection = this.getNumberOfTweetsInCollection();

		if(NumberOfTweetsInCollection > 0){
			var tweets = this.props.tweets;
			var htmlMarkup = this.createHtmlStringOfTweetList();
			var removeAllTweetsFromCollection = this.props.onRemoveAllTweetsFromCollection;
			var handleRemoveTweetsFromCollection = this.props.onRemoveAllTweetsFromCollection;

			return(
				<div>
					<CollectionControls NumberOfTweetsInCollection={NumberOfTweetsInCollection} htmlMarkup={htmlMarkup}
					onRemoveAllTweetsFromCollection={removeAllTweetsFromCollection}/>

					<TweetList tweets={tweets} onRemoveTweetFromCollection={handleRemoveTweetsFromCollection}/>
				</div>
			);
		} 
		return <Header text="Your Collection is empty" />;
	}
});

module.exports = Collection;