var React = require('react');
var ReactDOMServer = require('react-dom/server');
var CollectionControls = require('./CollectionControls.react');
var TweetList = require('./TweetList.react');
var Header = require('./Header.react');
var CollectionUtils = require('../utils/CollectionUtils');
var CollectionStore = require('../stores/CollectionStore');

var Collection = React.createClass({

	getInitialState: function(){
		return{
			collectionTweets: CollectionStore.getCollectionTweets();
		}
	},

	componentDidMount: function(){
		CollectionStore.addChangeListener(this.onCollectionChange);
	},

	componentWillUnmount: function(){
		CollectionStore.removeChangeListener(this.onCollectionChange);
	},

	onCollectionChange: function(){
		this.setState({
			collectionTweets: CollectionStore.getCollectionTweets();
		});
	},

	createHtmlStringOfTweetList: function(){
		var htmlString = ReactDOMServer.renderToStaticMarkup(
			<TweetList tweets={this.props.tweets}/>
		);

		var htmlMarkup = {
			html: htmlString
		};

		return JSON.stringify(htmlMarkup);
	},

	// getListOfTweetIds: function(){
	// 	return Object.keys(this.props.tweets);
	// },

	// getNumberOfTweetsInCollection: function(){
	// 	return this.getListOfTweetIds().length;
	// },

	render: function(){
		var collectionTweets = this.state.collectionTweets;
		var numberOfTweetsInCollection = this.getNumberOfTweetsInCollection();
		var htmlMarkup;

		if(NumberOfTweetsInCollection > 0){
			//var tweets = this.props.tweets;
			var htmlMarkup = this.createHtmlStringOfTweetList();
			//var removeAllTweetsFromCollection = this.props.onRemoveAllTweetsFromCollection;
			//var handleRemoveTweetsFromCollection = this.props.onRemoveAllTweetsFromCollection;

			return(
				<div>
					<CollectionControls NumberOfTweetsInCollection={NumberOfTweetsInCollection} htmlMarkup={htmlMarkup}/>

					<TweetList tweets={tweets}/>
				</div>
			);
		} 
		return <Header text="Your Collection is empty" />;
	}
});

module.exports = Collection;