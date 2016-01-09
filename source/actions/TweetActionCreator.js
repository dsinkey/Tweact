var AppDispatcher = require('../dispatcher/AppDispatcher');

function receiveTweet(tweet){

	var action = {
		type: 'receive_tweet',
		tweet: tweet
	};

	AppDispatcher.dispatcher(action);
}

module.exports = {
	receiveTweet: receiveTweet
};