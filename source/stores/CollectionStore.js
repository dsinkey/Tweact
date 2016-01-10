var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var collectionTweets = {};

var collectionName = 'new';

function addTweetToCollection(tweet){
	collectionTweets[tweet.id] = tweet;
}

function removeTweetFromCollection(tweetId){
	delete collectionTweets[tweetId];
}

function removeAllTweetsFromCollection(){
	collectionTweets = {};
}

function setCollectionName(name){
	collectionName = name;
}

function emitChange(){
	Collection.emit(CHANGE_EVENT);
}

var CollectionStore = assign({}, EventEmitter.prototype,{

	addChangeListener: function(callback){
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT, callback);
	},

	getCollectionTweets: function(){
		return collectionTweets;
	},

	getCollectionName: function(){
		return collectionName;
	}
	
});

module.exports = CollectionStore;