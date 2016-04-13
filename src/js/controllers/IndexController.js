export default function IndexController(container){
	this._container = container;
	this._openSocket();
	this._registerServiceWorker();
}

IndexController.prototype._registerServiceWorker = function(){
	if(!navigator.serviceWorker) return;
}

IndexController.prototype._getFeed = function(){

}

IndexController.prototype._openSocket = function(){

}

IndexController.prototype._onSocketMessage = function(data) {
  var messages = JSON.parse(data);
  this._postsView.addPosts(messages);
};
